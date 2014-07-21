import sys
sys.path.insert(0, '/home/di-folca/lar-cc/lib/py/')
from sysml import *
from splines import *
import numpy as np

#rimuove le celle nell'array toRemove dal larmodel master
def removeCells(master, toRemove):
    V,CV = master
    return V,[cell for k,cell in enumerate(CV) if not (k in toRemove)]

#definisce un lar model con le dimenzioni descritte dal size patterns
def assemblyDiagram(sizePatterns):
    return assemblyDiagramInit([len(f) for f in sizePatterns])(sizePatterns)

#mostra gli indici della cella rispetto alla lista CV del larmodel
def mostraNumeroCelle(larmodel, colore, grandezza):
    hpc = SKEL_1(STRUCT(MKPOLS(larmodel)))
    hpc = cellNumbering (larmodel,hpc)(range(len(larmodel[1])),colore,grandezza)
    VIEW(hpc)

#somma tutti gli elementi di una lista serve a ricavare le dimensioni massime
def sommatore(lista):
    res = .0
    for a in lista:
        res = a+res
    return res

def colort(r,g,b,t=1):
    return COLOR(Color4f([r/255.0, g/255.0, b/255.0, t]))

''' Facets extraction of a block diagram '''
def extractFacets(master, emptyChain=[]):
    solidCV = [cell for k,cell in enumerate(master[1]) if not (k in emptyChain)]
    exteriorCV =  [cell for k,cell in enumerate(master[1]) if k in emptyChain]
    exteriorCV += exteriorCells(master)
    CV = solidCV + exteriorCV
    V = master[0]
    FV = [f for f in larFacets((V,CV),3,len(exteriorCV))[1] if len(f) >= 4]
    BF = boundaryCells(solidCV,FV)
    boundaryFaces = [FV[face] for face in BF]
    B_Rep = V,boundaryFaces
    return B_Rep


''' Triangular facets extraction of a block diagram '''
def extractTriaFacets(master, emptyChain=[]):
    master = extractFacets(master,emptyChain)
    master = quads2tria(master)
    return master


''' Exports a model (V,FV) into an .obj format file at 'filePath' '''
def objExporter((V,FV), filePath):
    out_file = open(filePath,"w")
    out_file.write("# List of Vertices:\n")
    for v in V:
        out_file.write("v")
        for c in v:
            out_file.write(" " + str(c))
        out_file.write("\n")
    out_file.write("# Face Definitions:\n")
    for f in FV:
        out_file.write("f")
        for v in f:
            out_file.write(" " + str(v+1))
        out_file.write("\n")
    out_file.close()


''' Rimuove dalla lista dei vertici i vertici non effettivamente 
    utilizzati per la definizione delle celle '''
def clearUnusedVertices((V,CV)):
    UV = [v for cell in CV for v in cell]
    UnV = [k for k,vert in enumerate(V) if k not in UV]
    for cell in CV:
        for i in range(len(cell)):
            c = 0
            for v in UnV:
                if cell[i] > v:
                    c += 1
            cell[i] -= c
    V = [vert for k,vert in enumerate(V) if k not in UnV]
    return V,CV

DRAW = COMP([VIEW,SKEL_1,STRUCT,MKPOLS])

##MISURE
xporta=1
zporta=2

xfinestra=0.5
zfinestra=1
spigolo=0.2

xscala=(2.24)/2
yscala=2./2
zscala=3.6/2
primoblocco=(3.94-2.25-spigolo)

###### INGRESSO

ingressoPattern=[[spigolo, primoblocco, spigolo, xscala*2, spigolo], [spigolo, yscala*2, spigolo, 3.10,spigolo, 1.64], [spigolo, 3.,spigolo]]
ingresso=assemblyDiagram(ingressoPattern)


portaSalone= assemblyDiagram([[spigolo],[spigolo/2,xporta,(3.10-2.5)],[zporta,1]])
portaPrincipale=assemblyDiagram([[spigolo,xporta,(2.14-spigolo-1)],[.3],[zporta,1]])
facciataInterna=assemblyDiagram([[(primoblocco*0.5-(xfinestra/2)), xfinestra,(primoblocco*0.5-(xfinestra/2))], [spigolo], [3*.3, zfinestra, 3*0.7-zfinestra] ])
facciataEsterna=assemblyDiagram([[xscala-xfinestra-spigolo/2, xfinestra, spigolo, xfinestra, xscala-xfinestra-spigolo/2],[spigolo],[3*.3, zfinestra, 3*0.7-zfinestra]])
# mostraNumeroCelle(facciataEsterna,RED,2)
ingresso = diagram2cell(portaSalone,ingresso,82) 
ingresso = diagram2cell(portaPrincipale,ingresso,61)
ingresso=diagram2cell(facciataEsterna, ingresso, 55)
ingresso=diagram2cell(facciataInterna, ingresso, 19)
# mostraNumeroCelle(ingresso,RED,1)

#costruisco la lista degli oggetti da eliminare
listaInternoEsteriore=[4,21,39,7,24,10,27,13,51,33]+[61,67,33, 56]

#aggiungo gli spazi interni vuoti della parte destra
listaPortafinestre= [94,90, 117,102,108]

#finora da eliminare 76 e 82
lista=listaPortafinestre+listaInternoEsteriore
lista.sort()
ingressoMesh =extractTriaFacets(ingresso, lista)

#DRAW(ingressoMesh)

objExporter(ingressoMesh, "ingresso.obj")

############################CAMERA
cameraPattern= [[spigolo, primoblocco+spigolo+xscala*2, spigolo], [spigolo,3.04,spigolo],[spigolo, 3, spigolo]]
camera=assemblyDiagram(cameraPattern)

cameraSize = primoblocco+spigolo+xscala*2;

facciataEsterna = assemblyDiagram([[cameraSize*0.5-xfinestra*2.5, xfinestra*2, xfinestra, xfinestra*2, cameraSize*0.5-xfinestra*2.5],[spigolo],[3*.3, zfinestra, 3*0.7-zfinestra]]);

porta= assemblyDiagram([[2.9,xporta,.04],[spigolo],[zporta,1]])
porta2=assemblyDiagram([[spigolo],[1.46,xporta,3.04-1.46-xporta],[zporta,1]])
camera = diagram2cell(porta,camera,10)
camera = diagram2cell(porta2,camera,21)
camera= diagram2cell(facciataEsterna,camera, 15)
i=0.
for val in ingressoPattern[1]:
    i = i+val 

camera= [larTranslate([0,i,0])(camera[0]), camera[1]]

#mostraNumeroCelle(camera, CYAN,2)

removeFromCamera=[26,32,40,46,12]
cameraMesh =extractTriaFacets(camera, removeFromCamera)
#DRAW(cameraMesh)
objExporter(cameraMesh,"camera.obj")



######################Parte Destra della casa#######################
destraPattern=[[spigolo, 3.73, spigolo, 3,spigolo],[spigolo, 5.88, spigolo, 4.3, spigolo],[spigolo, 3, spigolo]]
finestraGrande=assemblyDiagram([[spigolo], [(5.88-xporta*2)/2,xporta*2, 5.88-(5.88+xporta*2)/2],[3*.3, zfinestra, 3*0.7-zfinestra]])#va piazzata sulla cella n 46
portaSoggiorno= assemblyDiagram([[(3.73-xporta)/2, xporta, 3.73-(3.73/2+xporta/2)], [spigolo], [zporta, (3-zporta)]])#cella 22
portaSoggiorno1= assemblyDiagram([[spigolo],[(4.3/2-xporta),xporta*2, (4.3/2-xporta)],[zporta, (3-zporta)]])#cella 34
portaSoggiorno2= assemblyDiagram([[spigolo],[(5.88-xporta*3)/2,xporta*3, 5.88-(5.88+xporta*3)/2],[zporta, (3-zporta)]])
destra= assemblyDiagram(destraPattern)
#mostraNumeroCelle(destra, GREEN, 1)
destra= diagram2cell(finestraGrande,destra,64)
destra=diagram2cell(portaSoggiorno1,destra, 40) 
destra=diagram2cell(portaSoggiorno2,destra, 34)
destra=diagram2cell(portaSoggiorno,destra,22)
#mostraNumeroCelle(destra, GREEN, 1)
destra=[larTranslate([sommatore(ingressoPattern[0]),0,0])(destra[0]), destra[1]]
removeFromDestra=[4,10,19,24,46,52,55,66,69,75,88,82,94]
saloneMesh =extractTriaFacets(destra, removeFromDestra)
#DRAW(saloneMesh)
objExporter(saloneMesh,"salone.obj")