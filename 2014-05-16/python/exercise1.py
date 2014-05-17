import sys
sys.path.insert(0, '/home/di-folca/lar-cc/lib/py/')

from sysml import *

DRAW = COMP([VIEW,STRUCT,MKPOLS])

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

####################INGRESSO################
ingressoPattern=[[0.3, (3.94-2.25-0.3), 0.3, 2.24, 0.3], [0.3, 2, 0.3, 3.10,0.3, 1.64], [0.3,3,0.3]]
ingresso=assemblyDiagram(ingressoPattern)

ingresso=removeCells(ingresso, range( (len(ingressoPattern[2])*len(ingressoPattern[1])*2) ) )#rimuove i primi 2 blocchi per ciascuna riga, altezza
#mostraNumeroCelle(ingresso,RED,1)
ingresso=removeCells(ingresso, [0,1,2,3,4,5,18,19,20,21,22,23,28,34])
#DRAW(ingresso)

#la porta dell'ingresso
#mostraNumeroCelle(ingresso, CYAN, 2)
porta= assemblyDiagram([[0.3],[1.5,1,(3.10-2.5)],[2,1]])
ingresso = diagram2cell(porta,ingresso,32)
ingresso=removeCells(ingresso,[41])
#mostraNumeroCelle(ingresso,CYAN,2)
porta2=assemblyDiagram([[0.3,1,(2.14-0.3-1)],[.3],[2,1]])
ingresso = diagram2cell(porta2,ingresso,13)
#mostraNumeroCelle(ingresso,CYAN,2)
ingresso=removeCells(ingresso,[45])

############CAMERA###########
cameraPattern= [[0.3, 3.94, 0.3], [0.3,2.84,0.3],[0.3, 3, 0.3]]
camera=assemblyDiagram(cameraPattern)
#mostraNumeroCelle(camera, CYAN,2)

porta= assemblyDiagram([[2.9,1,.04],[.3],[2,1]])
porta2=assemblyDiagram([[.3],[1.46,1,0.38],[2,1]])
camera = diagram2cell(porta,camera,10)
camera = diagram2cell(porta2,camera,21)
#mostraNumeroCelle(camera, CYAN,2)
camera=removeCells(camera,[27,12,33])


i=0.
for val in ingressoPattern[1]:
    i = i+val 

camera= [larTranslate([0,i,0])(camera[0]), camera[1]]


######################Parte Destra della casa#######################
destraPattern=[[0.3, 3.73, 0.3, 3,0.3],[.3, 5.88, .3, 4.3, .3],[0.3, 3, 0.3]]
destra= assemblyDiagram(destraPattern)
#mostraNumeroCelle(destra, GREEN, 1)
destra=removeCells(destra,[73,22,19,25,4,7,10,40,55,70,58,34,49])

i=.0
for l in ingressoPattern[0]:
    i=i+l

destra=[larTranslate([i,0,0])(destra[0]), destra[1]]

casa=STRUCT(MKPOLS(ingresso)+MKPOLS(camera)+MKPOLS(destra))
casaS=SKEL_1(STRUCT(MKPOLS(ingresso)+MKPOLS(camera)+MKPOLS(destra)))

VIEW(casaS)
#casa=STRUCT(MKPOLS(ingresso)+MKPOLS(camera)+MKPOLS(destra))
VIEW(casa)