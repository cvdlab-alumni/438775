import sys
sys.path.insert(0, '/home/di-folca/lar-cc/lib/py/')
from sysml import *
from splines import *
import numpy as np

####################FUNZONI DI SUPPORTO################

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

def sommatore(lista):
    res = .0
    for a in lista:
        res = a+res
    return res

DRAW = COMP([VIEW,STRUCT,MKPOLS])

######################ESERCIZIO3########################
#Sinceramente l'esercizio 3 ha portato a divergenti interpretazioni
#le propongo tutte successivamente

#questa funzione esegue l'inserimeno di un diagramma a cui e' stato rimossa una cella
def mergeNumberRemove(lardiagram, toRemove, master, tomerge):
    ncelle0=len(master[1])
    master=diagram2cell(lardiagram,master,tomerge)
    return removeCells(master,[ncelle0+v-1 for v in toRemove])

#permette di eseguire il merge del diagram su tutte le celle contenute nell'array tomerges
#in caso in cui nel merge sia presente per almeno due volte 1-la lunghezza del to merges il diagram potrebbe essere inserito all'interno di se stesso
#In generale scrivere piu di una volta la cella genera dei comportamenti anomali
def diagram2cellMassive(diagram,master,tomerges):
    tomerges.sort()
    tomerges.reverse()
    for c in tomerges:
        master=diagram2cell(diagram, master, c)
    return master


##############testMergeNumberRemove############

diagram=assemblyDiagram([[2,1,2],[.3],[2.2,.5]])
master=assemblyDiagram([[.3,3.2,.1,5,.3],[.3,4,.1,2.9,.3],[.3,2.7]])
mostraNumeroCelle(master, RED, 2)
mostraNumeroCelle(diagram, RED,2)
DRAW(mergeNumberRemove(diagram, [0,4],master, 31))

##############test diagram2cellMassive################
COMP([VIEW, SKEL_1, STRUCT,MKPOLS])(diagram2cellMassive(diagram, master, [11,31,39]))