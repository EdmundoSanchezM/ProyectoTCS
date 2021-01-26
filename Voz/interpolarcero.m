function[resultado] = interpolarcero(audio, entrada)
    tam = length(audio);
    resultado(1) = 0;
    for m = 1: tam
        resultado = [resultado,audio(m)];
        for n = 0: entrada
            resultado = [resultado,0];
        end
    end
end