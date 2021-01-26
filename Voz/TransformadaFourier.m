function dft = TransformadaFourier(DatosOnda)
    N = length(DatosOnda);
    if(isempty(DatosOnda) && ((length(DatosOnda) & (length(DatosOnda) - 1)) == 0))%Potencia de 2
        ArregloCompleto = [];
    else
        potenciaN = 1;
        
        while (potenciaN <= N)
            potenciaN = potenciaN * 2;
        end
        
        DatosFaltantes = potenciaN - N;
        MitadDatosFaltantes = round(DatosFaltantes / 2);
        ArregloCompleto = zeros(N + 2 * MitadDatosFaltantes, 1);
        ArregloCompleto(MitadDatosFaltantes+1:MitadDatosFaltantes+N) = DatosOnda(:);
    end
    
    N = length(ArregloCompleto);
    dft = zeros(N, 1);

    for k = 1:N
        n = 1-1:N-1;
        x = (2 * pi * (k-1) * n') ./ N;
        h = cos(x) - (sin(x) .* 1i);
        dft(k) = sum(ArregloCompleto .* h);
    end
    
    index = abs(real(dft)) < 1.25e-10;
    dft(index) = 0 + imag(dft(index)) * 1i;
    
    index = abs(imag(dft)) < 1.25e-10;
    dft(index) = real(dft(index)) + 0i;
end