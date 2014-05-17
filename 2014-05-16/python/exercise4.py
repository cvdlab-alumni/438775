from pyplasm import *
from scipy import *
import os,sys
""" import modules from larcc/lib """
sys.path.insert(0, '/home/di-folca/lar-cc/lib/py/')
from lar2psm import *
from simplexn import *
from larcc import *
from largrid import *
from mapper import *
from boolean import *
from sysml import *

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


""" 3D window to viewport transformation """
def diagram2cellMatrix(diagram):
   def diagramToCellMatrix0(master,cell):
      wdw = min(diagram[0]) + max(diagram[0])      # window3D [prende il piu piccolo punto e lo accorpa con il piu grande dei V, credo al solo fine di scorrerlo]
      cV = [master[0][v] for v in master[1][cell]] #suddivide i vertici per celle
      vpt = min(cV) + max(cV)                      # viewport3D
      #print "\n window3D =",wdw
      #print "\n viewport3D =",vpt
      
      mat = zeros((4,4))
      mat[0,0] = (vpt[3]-vpt[0])/(wdw[3]-wdw[0])
      mat[0,3] = vpt[0] - mat[0,0]*wdw[0]
      mat[1,1] = (vpt[4]-vpt[1])/(wdw[4]-wdw[1])
      mat[1,3] = vpt[1] - mat[1,1]*wdw[1]
      mat[2,2] = (vpt[5]-vpt[2])/(wdw[5]-wdw[2])
      mat[2,3] = vpt[2] - mat[2,2]*wdw[2]
      mat[3,3] = 1
      #print "\n mat =",mat
      return mat
   return diagramToCellMatrix0


def diagram2cell(diagram,master,cell):
   mat = diagram2cellMatrix(diagram)(master,cell)
   diagram =larApply(mat)(diagram)  
   #print diagram

   # yet to finish coding
   V, CV1, CV2, n12 = vertexSieve(master,diagram)
   #print "V=",V
   #print "cv1=",CV1
   #print "cv2=",CV2
   #print "n12=",n12

   #masterBoundaryFaces = boundaryOfChain(CV,FV)([cell])
   #diagramBoundaryFaces = lar2boundaryFaces(CV,FV)

   #V = master[0] + diagram[0]
   #offset = len(master[0])
   #CV = [c for k,c in enumerate(master[1]) if k != cell] + [#enumerate ritorna [[1, itemlista],[2,itemlista]] praticamente ricostruisce tutti i cv, eccetto quello della cell
   #   [v+offset for v in c] for c in diagram[1]]#prende i vertici

   master = V, CV1+CV2
   return master


#####test
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
mostraNumeroCelle(ingresso,CYAN,2)