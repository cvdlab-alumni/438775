from pyplasm import *
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
arcoSuperiore=STRUCT([colonnina, arcoSuperiore])

#capitello sotto
capitello=T(3)(-2.2)(capitello)
arcoSuperiore=STRUCT([capitello, arcoSuperiore])

#portone
portInt=COLOR(BLACK)(cilindro([PI, 1.3, 0.05]))
portEst=coronaCircolare([PI,1.3,1.4,0.10])
portEst2=coronaCircolare([PI,1.4,1.5, 0.15])
muratura=SKELETON(2)(coronaCircolare([PI,1.5,2, 0.22]))
portoneSuperiore= STRUCT([portInt, portEst, portEst2, muratura])

pil1=T([1,2])([1.3,-2])(CUBOID([0.1,2,0.10]))
pil2=T([1,2])([1.4,-2])(CUBOID([0.1,2,0.15]))
pil3=T([1,2])([1.5,-2])(CUBOID([0.5,2,0.22]))
pil4=COLOR(BLACK)(T([1,2])([-1.3,-2])(CUBOID([2.6,2,0.05])))
pil5=T([1,2])([-1.4,-2])(CUBOID([0.1,2,0.10]))
pil6=T([1,2])([-1.5,-2])(CUBOID([0.1,2,0.15]))
pil7=T([1,2])([-2,-2])(CUBOID([0.5,2,0.22]))

portoneSuperiore=STRUCT([portoneSuperiore, pil1, pil2,pil3,pil4,pil5,pil6,pil7])
VIEW(portoneSuperiore)

#finestrella
fin=CUBOID([1,1.5,0.22])

#NORD
riempimento=CUBOID([16,5,.22])
fasciaFinestr = STRUCT([, T(1)(0.5)] * 2)
filaVert = STRUCT([porta, T(2)(-0.5)] * 3)
