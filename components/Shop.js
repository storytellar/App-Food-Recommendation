import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from "react-native";

import {
  addMyNewFavStore,
  removeMyFavStore
} from "../controllers/store.controller";

import IconShop from "../assets/svg/shop.svg";
import IconHeart from "../assets/svg/heart.svg";
import IconStar from "../assets/svg/rate.svg";

const windowWidth = Dimensions.get("window").width;

const Shop = props => {
  // Declare global variable
  let {
    vote,
    shop,
    isLove,
    price,
    image,
    onPressItem,
    distance,
    onPressLove
  } = props;

  // Declare hook
  const [isFavorite, setFavorite] = React.useState(isLove);

  // Parse value of "vote"
  if (parseInt(vote) > 1 && parseInt(vote) <= 5)
    var votes = [...Array(parseInt(vote) - 1).keys()];
  else if (parseInt(vote) > 5) var votes = [...Array(4).keys()];
  else var votes = [...Array(0).keys()];

  var votesBlack = [...Array(5 - parseInt(vote)).keys()];

  // Function: Update value of isFavorite (isLove) store
  const updateMyFavoriteStore = async () => {
    setFavorite(!isFavorite);

    let storeID = onPressLove;
    let token = JSON.parse(await AsyncStorage.getItem("@account")).token;
    let result = false;

    if (isFavorite == true) {
      // => Update to false
      result = await removeMyFavStore(token, storeID);
    } else {
      // => Update to true
      result = await addMyNewFavStore(token, storeID);
    }

    // if (result == true) setFavorite(!isFavorite)
  };

  return (
    <View style={styles.border}>
      <TouchableOpacity onPress={onPressItem}>
        <View style={styles.container}>
          <View style={styles.mainInfo}>
            <View style={styles.itemPhoto}>
              <Image style={styles.image} source={image} />
            </View>
            <View style={styles.midInfo}>
              <View style={styles.itemShop}>
                <IconShop width={25} height={22} fill={"#3C3D46"} />
                <Text style={styles.itemTitle}>{" " + shop}</Text>
              </View>
              <View style={styles.itemVote}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View>
                    <IconStar width={14} height={14} fill={"#DC8D66"} />
                  </View>
                  {// Orange votes (icon)
                  votes.map(vote => {
                    return (
                      <View style={{ marginLeft: 1 }} key={vote}>
                        <IconStar width={14} height={14} fill={"#DC8D66"} />
                      </View>
                    );
                  })}
                  {// Black votes (icon)
                  votesBlack.map(vote => {
                    return (
                      <View style={{ marginLeft: 1 }} key={vote}>
                        <IconStar width={14} height={14} fill={"grey"} />
                      </View>
                    );
                  })}
                  <Text style={{ paddingLeft: 5, fontSize: 14 }}>{vote}</Text>
                </View>
              </View>
              <View style={styles.itemShop}>
                <Text style={styles.shopName}>{`About ${distance} km`}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rightInfo}>
            <TouchableOpacity onPress={updateMyFavoriteStore}>
              <IconHeart
                width={25}
                height={22}
                fill={isFavorite == true ? "#F66767" : "#B9B9B9"}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.price}>{price}k</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

function roundHalf(num) {
  return Math.round(num * 2) / 2;
}

const styles = StyleSheet.create({
  border: {
    marginVertical: 10,
    width: (9.5384615385 * windowWidth) / 12,
    height: 100,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 8,

    backgroundColor: "white"
  },
  container: {
    // backgroundColor: 'red',
    width: (8.9615384615 * windowWidth) / 12,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  mainInfo: {
    flexDirection: "row",
    alignItems: "center"
  },
  midInfo: {
    // backgroundColor: 'red',
    paddingLeft: 10
  },
  itemTitle: {
    fontSize: (0.6923076923 * windowWidth) / 17,
    fontWeight: "bold",
    color: "#3C3D47"
  },
  itemVote: {
    paddingLeft: 3,
    paddingVertical: 4
  },
  itemShop: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  shopName: {
    paddingLeft: 3,
    fontSize: (0.5384615385 * windowWidth) / 17,
    color: "#8B8B8B"
  },
  itemPhoto: {
    width: 80,
    height: 80
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8
  },
  rightInfo: {
    height: 70,
    justifyContent: "space-between"
  },
  price: {
    fontSize: 14,
    color: "#CF9331"
  }
});

export default Shop;
