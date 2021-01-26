% En esta funci�n cargaremos las 6 operaciones posibles con el audio
% obtenido
function[salida] = operaciones(audio_original, opcion, entrada)
tamanio = length(audio_original);
senial_trabajo = audio_original;
salida = 0;
    switch opcion
        case 'Convolucion con si misma'
             salida = conv(senial_trabajo,senial_trabajo);
        case 'Amplificacion'
            salida = amplificar(senial_trabajo, entrada);
            
        case 'Atenuacion'
            salida = atenuar(senial_trabajo, entrada);           
            
        case 'Reflejo'
            salida = reflejar(senial_trabajo);
        
        case 'Desplazamiento'
            salida = desplazar(senial_trabajo, entrada);
            
        case 'Diezmacion'
            salida = diezmar(senial_trabajo, entrada);
            
        case 'Interpolacion a cero'
            salida = interpolarcero(senial_trabajo, entrada);
            
        case 'Interpolacion a escalon'
            salida = interpolarescalon(senial_trabajo, entrada);    
        
        case 'Interpolacion lineal'
            salida = interpolar(senial_trabajo, entrada);
            
        case 'FFT'
            fas = TransformadaFourier(senial_trabajo);
            %fas = fft(senial_trabajo);
            if entrada==1
                salida = sqrt(real(fas).^2 + imag(fas).^2);
            else
                salida = atan(real(fas) ./ imag(fas));
            end
        otherwise

    end
end