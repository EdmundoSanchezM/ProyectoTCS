function [resultado] = desplazar(audio, entrada)
resultado = audio;
tam = length(audio);    
inicio = 1;
ceros = 0;
m = tam - entrada;
% Pruebas ...
%disp('-----');
%disp(audio(2000));
% - - - - - - Desplazamiento hacia la derecha - - - - - - - 
    if(entrada >= 0)
        % Llenar con ceros 
        for k = 1 : 1 : entrada
            resultado(k) = 0;
        end

        for k = entrada : 1 : tam
            resultado(k) = audio(k - (entrada - 1)); 
        end
% - - - - - - Desplazamiento hacia la izquierda - - - - - - - 
    elseif(entrada < 1)
        entrada = entrada * (-1);
        
        for k = tam : -1 : (entrada - 1)
            resultado(k) = 0;
        end

        for k = (tam - entrada) : -1 : 1
            resultado(k) = audio(k + (entrada)); 
        end
    end
end