function[resultado] = interpolarescalon(audio, entrada)
    tam = length(audio);
    resultado(1) = 0;
    for m = 1: tam
        resultado = [resultado,audio(m)];
        for n = 0: entrada
            resultado = [resultado,audio(m)];
        end
    end
end