import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import { Checkbox } from 'expo-checkbox';
import React, {useState} from "react";

export function ViewNomeEmailSenha ({children}) {
  return(
    <View style={styles.viewContainerNomeEmailSenha}>{children}</View>
  )
}
export function ViewCepNum ({children}) {
  return(
    <View style={styles.viewContainerCepNum}>{children}</View>
  )
}
export function ViewRuaCidade ({children}) {
  return(
    <View style={styles.viewContainerRuaCidade}>{children}</View>
  )
}
export function ViewCheckBox() {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.viewContainerCheckBox}>
      <Checkbox
        value={isChecked}
        onValueChange={setChecked} 
        color={isChecked ? '#FFBB12' : '#D2CEC5'} 
        style={styles.checkBox} 
      />
      <Text style={styles.label}>Concordo com os Termos e Condições</Text>
    </View>
  );
}
export function BotaoCadastro() {
  const handlePress = () => {
    console.log("Botão pressionado!");
  };

  return (
    <TouchableOpacity style={styles.botaoCadastrar} onPress={handlePress}>
      <Text style={styles.textBotaoCadastrar}>Cadastrar Conta</Text>
    </TouchableOpacity>
  );
}

export function ViewTitulo () {
  return(

      <View style={styles.viewContainerTitulo}>
        {/* // <View style={styles.titulo}>
        //   <View style={styles.iconeQuadrado}></View>
        //   <Text style={styles.textTitulo}>Inscreva-se</Text>
        // </View> */}
      <View style={styles.iconeMenu}>
          <Text style={styles.topLine}>___</Text>
          <Text style={styles.midLine}> __</Text>
          <Text style={styles.bottomLine}>___</Text>
      </View>
      </View>
  )
}
export function ViewLinha () {
  return(
    <View style={styles.linhaInicioPagina}></View>
  )
}
export function ViewSenha ({children}) {
  return(
    <View style={styles.viewContainerSenha}>{children}</View>
  )
}
export function ViewBotaoCadastro ({children}) {
  return(
    <View style={styles.viewContainerBotaoCadastro}>{children}</View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#313AEE'
  },
  viewContainerNomeEmailSenha: {
    // backgroundColor: "#313AEE",
    width: "auto",
    height: "auto",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  viewContainerCepNum: {
    // backgroundColor: "#313AEE",
    width: "auto",
    height: "auto",
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "row",
  },
  viewContainerRuaCidade: {
    // backgroundColor: "#FFFFFF",
    width: "auto",
    height: "auto",
    paddingLeft: 16,
    paddingRight: 16,
  },
  viewContainerCheckBox: {
    // backgroundColor: "#FFFFFF",
    width: "auto",
    height: 42,
    paddingTop: 12,
    paddingLeft: 20,
    flexDirection: "row",
  },
  checkBox: {
    cursor: "pointer",
    marginRight: 12,
  },
  viewContainerBotaoCadastro: {
    // backgroundColor: "#FFFFFF",
    height: 80,
    flexDirection: "row",
    display: "flex",
    paddingLeft: 12,
  },
  botaoCadastrar: {
    backgroundColor: "#FFBB12",
    marginTop: 12,
    marginLeft: 5,
    width: 160,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  textBotaoCadastrar: {
    color: "#764701",
    fontWeight: "bold", 
  },
  viewContainerTitulo: {
    marginBottom: 12,
    paddingLeft: 18,
    paddingRight: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "",
    display: "flex",
  },
  titulo: {
    flexDirection: "row",
    marginLeft: -12,
    marginTop: 8,
  },
  textTitulo: {
    marginTop: -3,
    fontSize: 38,
    fontWeight: "bold",
    color: "#464237",
  },
  iconeQuadrado: {
    backgroundColor: "#FFBB12",
    width: 26,
    height: 26,
    borderRadius: 3,
    marginRight: -20,
    marginBottom: 4,
  },
  iconeMenu: {
    width: 40,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 8,
    cursor: "pointer"
  },
  topLine: {
    color: "#464237",
    marginTop: -32,
    fontFamily: "arial",
    fontWeight: "bold",
    fontSize: 38,
  },
  midLine: {
    color: "#464237",
    marginTop: -34,
    fontFamily: "arial",
    fontWeight: "bold",
    fontSize: 38
  },
  bottomLine: {
    color: "#464237",
    marginTop: -34,
    fontFamily: "arial",
    fontWeight: "bold",
    fontSize: 38,
  },
  linhaInicioPagina: {
    backgroundColor: "#FFBB12",
    width: "flex",
    marginBottom: 12,
    height: 46,
  },
  viewContainerSenha: {
    backgroundColor: "#FFFFFF",
    height: "auto",
    flexDirection: "row",
    display: "flex",
  },
  label: {
    fontWeight: "bold",
    fontFamily: "arial",
    color: "#464237",
    fontSize: 13,
  }
});

