import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";
import styles from "../../css/stylescadastro";

// Componente InputNome
export function InputNome() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.viewInputs}>
      <Text style={styles.text}>Nome:</Text>
      <TextInput
        style={[styles.inputs, { borderColor: isFocused ? 'white' : '#FFFFFF' }]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        
      />
    </View>
  );
}

// Componente InputEmail
export function InputEmail() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.viewInputs}>
      <Text style={styles.text}>Email:</Text>
      <TextInput
        style={[styles.inputs, { borderColor: isFocused ? 'yellow' : '#D2CEC5' }]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        
        keyboardType="email-address"
      />
    </View>
  );
}

// Componente InputSenha
export function InputSenha({ senha, setSenha, senhaVisivel }) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <View style={styles.viewInputs}>
      <Text style={styles.text}>Senha:</Text>
      <TextInput
        style={[styles.inputSenha, { borderColor: isFocused ? 'yellow' : '#D2CEC5' }]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={!senhaVisivel}
        
      />
    </View>
  );
}

// Componente InputNumero
export function InputNumero() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.viewInputs}>
      <Text style={styles.text}>Número:</Text>
      <TextInput
        style={[styles.inputNumero, { borderColor: isFocused ? 'yellow' : '#D2CEC5' }]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        
        keyboardType="numeric"
      />
    </View>
  );
}

// Componente InputRua
export function InputRua({ rua }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.viewInputs}>
      <Text style={styles.text}>Rua:</Text>
      <TextInput
        style={[styles.inputs, { borderColor: isFocused ? 'yellow' : '#D2CEC5' }]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={rua}
        
      />
    </View>
  );
}

// Componente InputCidade
export function InputCidade({ cidade }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.viewInputs}>
      <Text style={styles.text}>Cidade:</Text>
      <TextInput
        style={[styles.inputs, { borderColor: isFocused ? 'yellow' : '#D2CEC5' }]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={cidade}
        
      />
    </View>
  );
}
