import sys
sys.path.insert(0, '/home/di-folca/lar-cc/lib/py/')
from simplexn import *
from larcc import *
from lar2psm import *
from largrid import *
from morph import *
from mapper import *
from lar2psm import *
from largrid import *
from morph import *
from mapper import *
from numpy import *

def circle(r):
    def circle0(p):
        alpha = p[0]
        return [r*COS(alpha), r*SIN(alpha)]
    return circle0

def cilindro(p):
    u,v,z=p
    domain2D= PROD([INTERVALS(u)(32), INTERVALS(v)(1)]) # 2D domain decompos
    domain3D=(PROD([domain2D, INTERVALS(z)(1)]))
    return (MAP(disk3D)(domain3D))

def coronaCircolare(p):
    angle, rInizio, rFine, deep=p
    cs=cilindro([angle,rInizio, deep])
    cerchioEsterno=cilindro([angle,rFine, deep])
    return DIFFERENCE([cerchioEsterno, cs])

arco=MAP(circle(0.5))(INTERVALS(1*PI)(32))
arco=JOIN(arco)

archetto=MAP(circle(0.2))(INTERVALS(1*PI)(32))
archettoDestro =T(1)(-0.3)(JOIN(archetto))
archettoSinistro =T(1)(0.3)(JOIN(archetto))
arcoSuperiore=DIFFERENCE([arco, archettoDestro, archettoSinistro])
arcoSuperiore=PROD([arcoSuperiore,Q(0.20)])

def disk3D(p): # point function
	u,v,z = p
	return [v*COS(u), v*SIN(u), z] # coordinate functions


#usato per svuotare
deep=0.22
cs=MAP(circle(0.5))(INTERVALS(1*PI)(32))
cs=JOIN(cs)
cs=PROD([cs,Q(deep)])

domain2D = PROD([INTERVALS(1*PI)(32), INTERVALS(0.66)(4)]) # 2D domain decompos
domain3D=(PROD([domain2D, INTERVALS(deep)(1)]))
cerchioEsterno=(MAP(disk3D)(domain3D))
cerchioEsterno=SKELETON(2)(DIFFERENCE([cerchioEsterno, cs]))#TRASPARENTE O NON?
arcoSuperiore=STRUCT([ cerchioEsterno, arcoSuperiore])
arcoSuperiore=R([1,2])(PI)(R([2,3])(PI/2)(arcoSuperiore))

#tutto per fare un capitello
verts = [[0.20,0],[0.16,0],[0.16,0.2]]
cells = [[1,2,3]]
pols = None
latos = MKPOL([verts, cells, pols])
latos = PROD([latos, Q(0.2)])
vert = [[ -0.04,0],[ 0,0],[ 0,0.2]]
latod = MKPOL([vert, cells, pols])
latod = PROD([latod, Q(0.2)])
corpo=CUBOID([0.16,0.20,0.20])
capitello=R([2,3])(PI/2)(STRUCT([latod, latos, corpo]))
capitello=R([1,2])(PI)(T([1,3])([-0.08, -0.2])(capitello))


#POSIZIONO IL CAPITELLO
arcoSuperiore=STRUCT([capitello, arcoSuperiore])

#coloninna
rColonnina=0.10
colonnina=cilindro([2*PI,rColonnina,2])
colonnina=T([2,3])([rColonnina, -2.2])(colonnina)

#capitello sotto
capitelloSotto=T(3)(-2.2)(capitello)
colonnina=STRUCT([capitello,colonnina,capitelloSotto])
colonninaDestra=T(1)(0.6)(colonnina)
colonninaSinitra=T(1)(-0.6)(colonnina)
arcoSuperiore=S([1,2,3])([0.7/0.5,4.5454545,2])(STRUCT([colonnina, arcoSuperiore, colonninaSinitra,colonninaDestra]))
#VIEW(arcoSuperiore)

#portone
#portInt=COLOR(Color4f([0.0, 0.0, 0.0, 0.0]))(cilindro([PI, 1.3, 0.05]))
portEst=coronaCircolare([PI,1.3,1.4,0.10])
portEst2=coronaCircolare([PI,1.4,1.5, 0.15])
muratura=SKELETON(2)(coronaCircolare([PI,1.5,2, 0.22]))
portoneSuperiore= STRUCT([ portEst, portEst2, muratura])

pil1=T([1,2])([1.3,-2])(CUBOID([0.1,2,0.10]))
pil2=T([1,2])([1.4,-2])(CUBOID([0.1,2,0.15]))
pil3=T([1,2])([1.5,-2])(CUBOID([0.5,2,0.22]))
#pil4=COLOR(Color4f([0.0, 0.0, 0.0, 0.0]))(T([1,2])([-1.3,-2])(CUBOID([2.6,2,0.05])))
pil5=T([1,2])([-1.4,-2])(CUBOID([0.1,2,0.10]))
pil6=T([1,2])([-1.5,-2])(CUBOID([0.1,2,0.15]))
pil7=T([1,2])([-2,-2])(CUBOID([0.5,2,0.22]))

portone=S([1,2,3])([7/3,2.5,10 ])(T(2)(2)(STRUCT([portoneSuperiore, pil1, pil2,pil3,pil5,pil6,pil7])))
portone=R([1,2])(PI)(R([2,3])(PI/2)(portone))
#VIEW(portone)

#finestra bassa
finestra= COLOR(Color4f([0.0, 0.5, 0.6, 0.0]))(CUBOID([2,0,3])) #TODO colore trasparente
corniceFinestra=DIFFERENCE([CUBOID([2,1,3]), T([1,3])([0.1,0.1])(CUBOID([1.8,1,2.8]))])
finestra=STRUCT([finestra,corniceFinestra])
#VIEW(finestra)

#costruisco la sezione bassa del muro
finestre=T([1,3])([1,7])(finestra)
finestre=STRUCT([finestre, T(1)(3)(finestre)])
finestre=STRUCT([finestre, T(1)(8)(finestre)])
finestre=STRUCT([finestre,T(1)(24)(finestre)])
nordLow=STRUCT([T(1)(19.5)(portone),finestre])
#VIEW(nordLow)

#separatore tra piani
separatore=CYLINDER([0.25,41])(6)
separatore=T([1,2,3])([-1,1,11.5])(R([1,3])(-PI/2)(separatore))
separatore=STRUCT([separatore,T(3)(12)]*2)
#VIEW(separatore)

#costruisco sezione alta del muro
arcoSuperiore=T(3)(12+4.5)(arcoSuperiore)
a1=T(1)(2)(arcoSuperiore)
a2=T(1)(5)(arcoSuperiore)
sezioneArchisuperiori=STRUCT([a1,a2])
sezioneArchisuperiori=STRUCT([sezioneArchisuperiori,T(1)(8)]*2)
nordMid=STRUCT([sezioneArchisuperiori,T(1)(24)]*2)
ac=T(1)(19.5)(arcoSuperiore)
nordMid=STRUCT([nordMid,ac])
nordTop=STRUCT([T(3)(12)(nordMid)])

nord=STRUCT([nordMid,nordTop, nordLow, separatore])
#VIEW(nord)


#################################costruisco la facciata est

#low
centro=26.5
f=T([1,3])([0,7])(finestra)
f1=T(1)(1.8)(f)
f2=T(1)(4.6)(f)
f3=T(1)(7.4)(f)
f4=T(1)(10.2)(f)
f5=T(1)(16)(f)
f6=T(1)(19)(f)

f1s=T(1)((centro-2.8)*2)(f1)
f2s=T(1)((centro-5.6)*2)(f2)
f3s=T(1)((centro-8.4)*2)(f3)
f4s=T(1)((centro-11.2)*2)(f4)
f5s=T(1)((centro-17)*2)(f5)
f6s=T(1)((centro-20)*2)(f6)

finestre=STRUCT([f1,f2,f3,f4,f5,f6,f1s,f2s,f3s,f4s,f5s,f6s])
estLow=STRUCT([T(1)(centro)(portone),finestre])
VIEW(estLow)

#mid
a1=T(1)(2.8)(arcoSuperiore)
a2=T(1)(5.6)(arcoSuperiore)
a3=T(1)(8.4)(arcoSuperiore)
a4=T(1)(11.2)(arcoSuperiore)
a5=T(1)(17)(arcoSuperiore)
a6=T(1)(20)(arcoSuperiore)

a1s=T(1)((centro-2.8)*2)(a1)
a2s=T(1)((centro-5.6)*2)(a2)
a3s=T(1)((centro-8.4)*2)(a3)
a4s=T(1)((centro-11.2)*2)(a4)
a5s=T(1)((centro-17)*2)(a5)
a6s=T(1)((centro-20)*2)(a6)
estMid=STRUCT([a1,a2,a3,a4,a5,a6,a1s,a2s,a3s,a4s,a5s,a6s, estLow])
VIEW(estMid)