import {View, StyleSheet, Button, TextInput, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useState, useEffect} from "react";
import React from "react";
import { InputNome, InputEmail, InputSenha, InputNumero, InputRua, InputCidade } from './cadastro/input.js';
import {ViewNomeEmailSenha, ViewCepNum, ViewRuaCidade, ViewCheckBox, BotaoCadastro, ViewTitulo, ViewLinha, ViewSenha, ViewBotaoCadastro} from "./cadastro/view.js";
import { Entypo } from '@expo/vector-icons';
import styles from "../css/stylescadastro.js";

export default function Cadastro({navigator}) {
  const [cep, setCep] = useState("");
  const [erro, setErro] = useState(null);
  const [dados, setDados] = useState(""); 
  const [valorRua, setValorRua] = useState("");
  const [valorCidade, setValorCidade] = useState("");
  const [isCepFocused, setIsCepFocused] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [senha, setSenha] = useState('');

  let pegarDados = async () => {
    setErro("");
      try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dadosRetornados = await resposta.json();
        if (dadosRetornados.erro) {
          setErro("CEP nao encontrado");
          setDados(null);
        } else {
          setDados(dadosRetornados);
          setValorRua(dadosRetornados.logradouro);
          setValorCidade(dadosRetornados.localidade);
        }
      } catch (err) {
        setErro("Erro ao buscar dados");
        setDados(null);
      }
  } 
  useEffect(() => {
  if (cep.length === 8) {
    pegarDados();
    }
  }, [cep]);

  return (
    <View>
      <ViewLinha></ViewLinha>
      <ViewTitulo></ViewTitulo>
      <View style={styles.viewPrincipal}>
      <ViewNomeEmailSenha>
        <InputNome/>
        <InputEmail/>
        <ViewSenha>
          <InputSenha senha={senha} setSenha={setSenha} senhaVisivel={senhaVisivel}/>
          <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)} style={styles.iconeSenhaVisivel}>
                <Entypo name={senhaVisivel ? "eye-with-line" : "eye"} size={20} color="#D2CEC5" />
          </TouchableOpacity>
        </ViewSenha>
      </ViewNomeEmailSenha>

      <ViewCepNum>
        <View style={styles.viewInputs}>
          <Text style={styles.label} >CEP:</Text>
         <TextInput 
            style={[styles.inputCep, { borderColor: isCepFocused ? 'yellow' : '#D2CEC5' }]}
            type="number" 
            maxLength={8} 
            name="CEP" 
            value={cep} 
            onChangeText={setCep}
            keyboardType="numeric"
            onFocus={() => setIsCepFocused(true)} 
            onBlur={() => setIsCepFocused(false)} 
          />

        </View>
        <InputNumero/>
      </ViewCepNum>

      <ViewRuaCidade>
        <InputRua rua={valorRua}/>
        <InputCidade cidade={valorCidade}/>
      </ViewRuaCidade>

      <ViewCheckBox></ViewCheckBox>
      <ViewBotaoCadastro>
        <BotaoCadastro></BotaoCadastro>
      </ViewBotaoCadastro>
      </View>
    </View>

    
  );
  
}

