import React, {Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  Dimensions,
  Pressable,
  BackHandler,
} from 'react-native';
import SvgIcon from './common/assets/images/SvgIcon';
import Fonts from './common/assets/fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import {Images} from './common/styles';

export default function ProductDetailScreen(props) {
  scrollX = new Animated.Value(0);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [trackData, setTracksData] = useState([]);
  const [track, setTrack] = useState(null);
  useEffect(() => {
    let tracks = props.navigation.getParam('trackGroup').tracks;
    setTrack(track);
    setTracksData(tracks);
  }, []);

  const setTimer = seconds => {
    let minutes = Math.floor(seconds / 60);
    let extraSeconds = seconds % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? '0' + extraSeconds : extraSeconds;
    return minutes + ':' + extraSeconds;
  };
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.cartBackIcon}
        onPress={() => props.navigation.goBack()}>
        <SvgIcon width={30} height={30} icon={'back2'} />
        <Text style={styles.headeName}>
          {props.navigation.getParam('trackGroup').title}
        </Text>
        <View></View>
      </Pressable>
      <View style={styles.scrollContainer}>
        <LottieView
          style={{width: 500, height: 300}}
          source={Images[props.navigation.getParam('trackGroup').avtaar]}
          autoPlay
          loop
        />
      </View>
      <ScrollView style={styles.productDetail}>
        <View style={{alignItems: 'center'}}>
          <SvgIcon width={90} height={50} icon={'line'} />
        </View>
        {trackData.length > 0 ? (
          <>
            {trackData.map(data => (
              <Pressable
                onPress={() =>
                  props.navigation.navigate('PlayerScreen', {track: trackData})
                }
                style={{
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 1,
                }}>
                <View style={styles.productDetailFirst}>
                  <View style={styles.productSpecCon}>
                    <Text style={styles.productName}>{data.name}</Text>
                    <Text style={styles.productPrice}>
                      {setTimer(data.duration)} min
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.cartBtn}
                    onPress={() => props.navigation.navigate('CartScreen')}>
                    <SvgIcon width={20} height={20} icon={'play'} />
                  </TouchableOpacity>
                </View>
              </Pressable>
            ))}
          </>
        ) : (
          <View style={styles.scrollContainer}>
            <LottieView
              style={{width: 250, height: 350}}
              source={require('./common/assets/images/files/loader.json')}
              autoPlay
              loop
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', height: '100%'},
  cartBackIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 12,
  },
  scrollContainer: {
    alignItems: 'center',
    marginTop: 0,
  },

  productDetail: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: '#fdf8f4',
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    paddingVertical: 0,
    height: 450,
  },
  productDetailFirst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  productPrice: {
    color: '#000',
    fontFamily: Fonts.type.NunitoRegular,
    fontSize: 16,
  },
  productDetailSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  productSpecCon: {
    paddingVertical: 5,
  },
  productName: {
    color: '#000',
    fontFamily: Fonts.type.NunitoBlack,
    textAlign: 'left',
    width: 200,
    fontSize: 15,
  },
  headeName: {
    fontFamily: Fonts.type.NunitoSemiBold,
    color: '#000',
    fontSize: 20,
  },
  productQuan: {
    color: '#000',
    fontFamily: Fonts.type.NunitoLight,
    paddingVertical: 5,
  },

  cartBtn: {
    backgroundColor: '#000',
    width: '100%',
    padding: 10,
    borderRadius: 50,
  },
});
