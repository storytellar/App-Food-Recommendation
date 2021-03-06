import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { withNavigationFocus } from "react-navigation";

import { logout, getLocalData } from "../controllers/account.controller";

import IconMale from "../assets/svg/male.svg";
import IconUser from "../assets/svg/user.svg";
import IconConcern from "../assets/svg/concern.svg";
import IconLogout from "../assets/svg/logout.svg";
import IconMore from "../assets/svg/more.svg";

const windowWidth = Dimensions.get("window").width;

const AccountScreen = props => {
  const [nameValue, onChangeName] = React.useState("");
  const [cityValue, onChangeCity] = React.useState("");

  React.useEffect(() => {
    getAccountData();
  }, [getLocalData()]);

  const getAccountData = async () => {
    data = await getLocalData();
    data = JSON.parse(data);
    onChangeName(
      data ? (data.info.name ? data.info.name : data.info.username) : "username"
    );
    onChangeCity(data.info.city ? data.info.city : "City: Unknown");
  };

  return (
    <View style={{ flex: 1, alignItems: "center"}}>
      <View
        style={{
          flex: 0.4,
          width: "100%",
          backgroundColor: "#DC8D66",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <View style={{ width: windowWidth * 0.05 }}></View>
        <IconMale width={150} height={150} />
        <View>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              color: "#3C3D46"
            }}
          >
            {props.navigation.getParam('name') ? props.navigation.getParam('name') : nameValue}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: "#3C3D46"
            }}
          >
            {props.navigation.getParam('city') ? props.navigation.getParam('city') : cityValue}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.6,
          width: "100%",
          backgroundColor: "#F7F7F7",
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          style={[
            styles.menuBtn,
            {
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              marginTop: -30
            }
          ]}
          onPress={async () => {
            props.navigation.navigate("EditInfo");
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <IconUser width={26} height={26} />
            <Text style={styles.menuTxt}>Profile</Text>
          </View>
          <View style={{ marginRight: 10 }}>
            <IconMore width={26} height={26} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuBtn,
            { borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }
          ]}
          onPress={async () => {
            props.navigation.navigate("Concern");
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <IconConcern width={26} height={26} />
            <Text style={styles.menuTxt}>Concern</Text>
          </View>
          <View style={{ marginRight: 10 }}>
            <IconMore width={26} height={26} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuBtn, { marginTop: 15, borderRadius: 15 }]}
          onPress={async () => {
            await logout();
            props.navigation.navigate("Login");
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <IconLogout width={26} height={26} />
            <Text style={styles.menuTxt}>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

AccountScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  menuBtn: {
    backgroundColor: "white",
    height: 60,
    width: windowWidth * 0.7,
    alignItems: "center",
    paddingLeft: 15,
    flexDirection: "row",
    justifyContent: "space-between",

    shadowColor: "#575460",
    shadowOffset: {
      width: -2,
      height: 3
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 7
  },
  menuTxt: {
    marginLeft: 10,
    fontSize: 20,
    color: "#575460"
  }
});

export default withNavigationFocus(AccountScreen);
