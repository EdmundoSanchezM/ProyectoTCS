% Esta función muestra una barra de carga de aproximadamente 5 segundos de
% duración
function [] = mostrarBarra()
f = waitbar(0,'Grabando audio');
suma = 0;
for segundos = 0 : 3
   waitbar(suma, f, "Grabando audio");
   suma = suma + 0.2;
   pause(1)
end
close(f);
end
