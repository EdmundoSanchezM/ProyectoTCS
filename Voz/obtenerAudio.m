% Funci�n que obtiene una se�al de audio y la almacena en un arreglo de
% enteros
function[senial] = obtenerAudio()
tiempo = 3; % tres segundfos
% 8000 muestras / segundo
    recObj = audiorecorder;
    f = msgbox('Grabando audio, deje esta ventana abierta porfavor =)');
    recordblocking(recObj, tiempo);
    close(f);
    g = msgbox('.::Se finalizo la grabacion con exito =)::.');
    pause(1)
    close(g);

    % Almacenamos la grabacion en un arreglo de enteros
    senial = getaudiodata(recObj);
    % Verificaci�n en consola
    tam= length(senial);
end