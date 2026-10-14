# Synthesizes music bed + SFX in code, ducks music under the VO, writes cache/mix.wav (44.1k stereo, 44.5 s)
import numpy as np, subprocess, wave, sys
SR=44100; DUR=44.5; N=int(SR*DUR)
rng=np.random.default_rng(7)
def T(n): return np.arange(n)/SR
def env(n,a,r):
    e=np.ones(n); na=int(a*SR); nr=int(r*SR)
    if na>0: e[:na]=np.linspace(0,1,na)
    if nr>0: e[-nr:]*=np.linspace(1,0,nr)
    return e
def add(buf,sig,t0,gain=1.0,pan=0.0):
    i=int(t0*SR); j=min(N,i+len(sig))
    if i<0 or i>=N: return
    s=sig[:j-i]*gain
    buf[0,i:j]+=s*(1-max(pan,0)); buf[1,i:j]+=s*(1+min(pan,0))
mus=np.zeros((2,N)); sfx=np.zeros((2,N))
# --- music: soft pads + sparse plucks, C - Am - F - G, ~5.6 s per chord
f=lambda m:440*2**((m-69)/12)
chords=[[48,55,64,71],[45,52,60,67],[41,48,57,64],[43,50,59,66]]
step=5.6
for k in range(int(DUR/step)+1):
    ch=chords[k%4]; t0=k*step; n=int((step+1.2)*SR)
    for m in ch:
        for det in(-.8,.8):
            sig=np.sin(2*np.pi*(f(m)+det*.1)*T(n))*.5+np.sin(2*np.pi*f(m+12)*T(n))*.12
            add(mus,sig*env(n,1.4,1.6)*.045,t0,pan=det*.4)
    # plucks (arpeggio, every 0.7 s)
    for q in range(int(step/.7)):
        m=ch[q%4]+12+(12 if q%3==2 else 0); nn=int(1.4*SR)
        sig=np.sin(2*np.pi*f(m)*T(nn))*np.exp(-T(nn)*3.2)
        add(mus,sig,t0+q*.7,.05*(1 if k>0 else .0),pan=(q%2-.5)*.6)
# --- SFX
def whoosh(dur=.8,f0=300,f1=3500):
    n=int(dur*SR); x=rng.standard_normal(n); fr=np.geomspace(f0,f1,n); ph=np.cumsum(fr)/SR
    y=x*(.5+.5*np.sin(2*np.pi*ph)); y=np.convolve(y,np.ones(24)/24,'same')
    return y*np.sin(np.linspace(0,np.pi,n))**1.6
for tt in [2.55,4.95,8.9,13.7,17.75,22.95,27.25,34.5,39.1]: add(sfx,whoosh(),tt-.45,.10,pan=.2)
def pop(fr=880,dur=.12):
    n=int(dur*SR); return np.sin(2*np.pi*fr*T(n))*np.exp(-T(n)*38)
for i,tt in enumerate([.55,1.2,3.0,5.1,6.4,7.3,8.0,9.2,10.9,11.2,11.5,12.2,14.0,15.6,16.2,18.0,20.0,23.2,24.4,25.3,26.2,28.2,29.8,31.2,33.0,36.5,37.5,37.9,40.7,42.3]):
    add(sfx,pop(660+60*(i%5)),tt,.07,pan=((i%3)-1)*.3)
for tt in np.arange(2.7,4.5,.07): add(sfx,pop(2400,.02),tt,.03)   # counter ticks
# riser into logo + impact + shimmer
n=int(2.0*SR); x=rng.standard_normal(n); fr=np.geomspace(400,6000,n); y=x*np.sin(2*np.pi*np.cumsum(fr)/SR); y=np.convolve(y,np.ones(8)/8,'same')
add(sfx,y*np.linspace(0,1,n)**2.2,37.3,.07)
n=int(2.2*SR); imp=np.sin(2*np.pi*(52+40*np.exp(-T(n)*6))*T(n))*np.exp(-T(n)*2.2); add(sfx,imp,39.28,.45)
for k,m in enumerate([84,88,91,95]):
    nn=int(2.5*SR); add(sfx,np.sin(2*np.pi*f(m)*T(nn))*np.exp(-T(nn)*1.8),39.3+k*.08,.05,pan=(k-1.5)*.4)
nn=int(2*SR); add(sfx,np.sin(2*np.pi*1318*T(nn))*np.exp(-T(nn)*2.4),20.05,.06)   # chime on "كأنها أمس"
# --- VO
subprocess.run(['ffmpeg','-y','-v','error','-i','assets/vo/vo_v1.mp3','-ac','1','-ar',str(SR),'cache/vo.wav'],check=True)
w=wave.open('cache/vo.wav'); vo=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(float)/32768; w.close()
vo=vo/np.sqrt(np.mean(vo**2))*.12   # ~ -18 dBFS RMS before loudnorm
V=np.zeros(N); V[:min(N,len(vo))]=vo[:N]
# duck music under VO
env_v=np.convolve(np.abs(V),np.ones(int(.25*SR))/int(.25*SR),'same'); duck=1-.55*np.clip(env_v/.05,0,1)
duck=np.convolve(duck,np.ones(int(.3*SR))/int(.3*SR),'same')
mix=np.zeros((2,N)); mix+=V*1.0; mix+=mus*duck*1.0; mix+=sfx
mix=np.tanh(mix*1.2)/1.2
pcm=(np.clip(mix,-1,1).T*32767).astype(np.int16)
w=wave.open('cache/mix.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes()); w.close()
print('ok',pcm.shape)
