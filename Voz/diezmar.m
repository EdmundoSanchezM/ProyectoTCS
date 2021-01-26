function[resultado] = diezmar(audio, entrada)
    tam = length(audio);
    resultado(1) = 0;
    k = 1;
    for i = 1: entrada : tam        
            resultado(k) =  audio(i);
            k = k + 1;          
    end
end