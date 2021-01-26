function[resultado] = reflejar(audio)
    tam = length(audio);
    k = 1;
    for i = tam : -1 : 1
        resultado(k) = audio(i);
        k = k + 1;
    end
end