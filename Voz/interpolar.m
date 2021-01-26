function[resultado] = interpolar(audio, entrada)
    tam = length(audio);
    
    %calculo el intervalo que hay entre dos muestras
    k = 1;
    resultado(1) = 0;
    for i = 1: 1 : tam - 1
       tamIntervalos = abs( audio(i+1) - audio(i) ) / entrada ;
       %disp(tamIntervalos);
       disp(audio(i));
       for j = 0: 1 : entrada
           resultado(k)=  audio(i) + (j * tamIntervalos);
           k=k+1;
           
       end
    end
    resultado(k) = audio(tam);
end