function varargout = menu_principal(varargin)
% MENU_PRINCIPAL MATLAB code for menu_principal.fig
%      MENU_PRINCIPAL, by itself, creates a new MENU_PRINCIPAL or raises the existing
%      singleton*.
%
%      H = MENU_PRINCIPAL returns the handle to a new MENU_PRINCIPAL or the handle to
%      the existing singleton*.
%
%      MENU_PRINCIPAL('CALLBACK',hObject,eventData,handles,...) calls the local
%      function named CALLBACK in MENU_PRINCIPAL.M with the given input arguments.
%
%      MENU_PRINCIPAL('Property','Value',...) creates a new MENU_PRINCIPAL or raises the
%      existing singleton*.  Starting from the left, property value pairs are
%      applied to the GUI before menu_principal_OpeningFcn gets called.  An
%      unrecognized property name or invalid value makes property application
%      stop.  All inputs are passed to menu_principal_OpeningFcn via varargin.
%
%      *See GUI Options on GUIDE's Tools menu.  Choose "GUI allows only one
%      instance to run (singleton)".
%
% See also: GUIDE, GUIDATA, GUIHANDLES

% Edit the above text to modify the response to help menu_principal

% Last Modified by GUIDE v2.5 25-Jan-2021 02:36:04

% Begin initialization code - DO NOT EDIT
gui_Singleton = 1;
gui_State = struct('gui_Name',       mfilename, ...
                   'gui_Singleton',  gui_Singleton, ...
                   'gui_OpeningFcn', @menu_principal_OpeningFcn, ...
                   'gui_OutputFcn',  @menu_principal_OutputFcn, ...
                   'gui_LayoutFcn',  [] , ...
                   'gui_Callback',   []);
if nargin && ischar(varargin{1})
    gui_State.gui_Callback = str2func(varargin{1});
end

if nargout
    [varargout{1:nargout}] = gui_mainfcn(gui_State, varargin{:});
else
    gui_mainfcn(gui_State, varargin{:});
end
% End initialization code - DO NOT EDIT


% --- Executes just before menu_principal is made visible.
function menu_principal_OpeningFcn(hObject, eventdata, handles, varargin)
% This function has no output args, see OutputFcn.
% hObject    handle to figure
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
% varargin   command line arguments to menu_principal (see VARARGIN)

% Choose default command line output for menu_principal
handles.output = hObject;

% Update handles structure
guidata(hObject, handles);

% Cerrar ventana iniciar.fig
close(iniciar);

% UIWAIT makes menu_principal wait for user response (see UIRESUME)
% uiwait(handles.figure1);


% --- Outputs from this function are returned to the command line.
function varargout = menu_principal_OutputFcn(hObject, eventdata, handles) 
% varargout  cell array for returning output args (see VARARGOUT);
% hObject    handle to figure
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Get default command line output from handles structure
varargout{1} = handles.output;



function edit1_Callback(hObject, eventdata, handles)
% hObject    handle to edit1 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of edit1 as text
%        str2double(get(hObject,'String')) returns contents of edit1 as a double


% --- Executes during object creation, after setting all properties.
function edit1_CreateFcn(hObject, eventdata, handles)
% hObject    handle to edit1 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end


% --- Executes on button press in btn_getAudio.
function btn_getAudio_Callback(hObject, eventdata, handles)
% hObject    handle to btn_getAudio (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

audio = obtenerAudio();       
axes(handles.senial_original);      % Estamos trabajando en senial_original
plot(audio);
handles.audio = audio;
guidata(hObject, handles);

% --- Executes on button press in btn_reproducir.
function btn_reproducir_Callback(hObject, eventdata, handles)
% hObject    handle to btn_reproducir (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
audio = handles.audio;
tam = length(audio);
sound(audio);



% --- Executes on button press in rdbtn_amplificar.
function rdbtn_amplificar_Callback(hObject, eventdata, handles)
% hObject    handle to rdbtn_amplificar (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hint: get(hObject,'Value') returns toggle state of rdbtn_amplificar


% --- Executes on button press in rdbtn_atenuar.
function rdbtn_atenuar_Callback(hObject, eventdata, handles)
% hObject    handle to rdbtn_atenuar (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hint: get(hObject,'Value') returns toggle state of rdbtn_atenuar


% --- Executes on button press in rdbtn_desplazar.
function rdbtn_desplazar_Callback(hObject, eventdata, handles)
% hObject    handle to rdbtn_desplazar (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hint: get(hObject,'Value') returns toggle state of rdbtn_desplazar


% --- Executes on button press in rdbtn_reflejar.
function rdbtn_reflejar_Callback(hObject, eventdata, handles)
% hObject    handle to rdbtn_reflejar (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hint: get(hObject,'Value') returns toggle state of rdbtn_reflejar


% --- Executes on button press in rdbtn_diezmar.
function rdbtn_diezmar_Callback(hObject, eventdata, handles)
% hObject    handle to rdbtn_diezmar (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hint: get(hObject,'Value') returns toggle state of rdbtn_diezmar


% --- Executes on button press in rdbtn_interpolar.
function rdbtn_interpolar_Callback(hObject, eventdata, handles)
% hObject    handle to rdbtn_interpolar (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hint: get(hObject,'Value') returns toggle state of rdbtn_interpolar


% --- Executes on button press in rdbtn_interpolar.
function inter0_Callback(hObject, eventdata, handles)
% hObject    handle to rdbtn_interpolar (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hint: get(hObject,'Value') returns toggle state of rdbtn_interpolar

% --- Executes on button press in rdbtn_interpolar.
function interE_Callback(hObject, eventdata, handles)
% hObject    handle to rdbtn_interpolar (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hint: get(hObject,'Value') returns toggle state of rdbtn_interpolar


% --- Executes on button press in rdbtn_interpolar.
function convolucion_Callback(hObject, eventdata, handles)
% hObject    handle to rdbtn_interpolar (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hint: get(hObject,'Value') returns toggle state of rdbtn_interpolar


% --- Executes on button press in rdbtn_interpolar.
function radiobuttonFFT_Callback(hObject, eventdata, handles)
% hObject    handle to rdbtn_interpolar (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hint: get(hObject,'Value') returns toggle state of rdbtn_interpolar

% --- Executes on button press in btn_calcular.

function btn_calcular_Callback(hObject, eventdata, handles)
% hObject    handle to btn_calcular (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
audio_original = handles.audio;
entrada = str2double(get(handles.entrada, 'String'));
tipo = str2double(get(handles.tipo, 'String'));

opcion = get(handles.panel,'SelectedObject');
nombre = get(opcion, 'String');
if ((tipo == 1 | tipo ==2) & strcmp(nombre,'FFT')   )
audio_salida = operaciones(audio_original, nombre, tipo);
else
audio_salida = operaciones(audio_original, nombre, entrada);
end

% - - - - - - - - - - MOSTRAR GRAFICA - - - - - - - - - - - - - - - - -
% Estamos trabajando en senial_original
axes(handles.senial_modificada);  
plot(audio_salida);
% - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
handles.audiomod = audio_salida;
guidata(hObject, handles);


function entrada_Callback(hObject, eventdata, handles)
% hObject    handle to entrada (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of entrada as text
%        str2double(get(hObject,'String')) returns contents of entrada as a double


% --- Executes during object creation, after setting all properties.
function entrada_CreateFcn(hObject, eventdata, handles)
% hObject    handle to entrada (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.

if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end


% --- Executes on button press in btn_audiomod.
function btn_audiomod_Callback(hObject, eventdata, handles)
% hObject    handle to btn_audiomod (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
audio = handles.audiomod;
sound(audio);

function tipo_Callback(hObject, eventdata, handles)
% hObject    handle to tipo (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of tipo as text
%        str2double(get(hObject,'String')) returns contents of tipo as a double


% --- Executes during object creation, after setting all properties.
function tipo_CreateFcn(hObject, eventdata, handles)
% hObject    handle to tipo (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end


% --------------------------------------------------------------------
function Untitled_1_Callback(hObject, eventdata, handles)
% hObject    handle to Untitled_1 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)


% --------------------------------------------------------------------
function Untitled_2_Callback(hObject, eventdata, handles)
% hObject    handle to Untitled_2 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
