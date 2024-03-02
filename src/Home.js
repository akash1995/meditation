import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import Images from './common/assets/images';
import SvgIcon from './common/assets/images/SvgIcon';
import Fonts from './common/assets/fonts';
import LottieView from 'lottie-react-native';
import musicData from './utils/tracks.json';
import fonts from './common/assets/fonts';
const images = new Array(3).fill(Images.hairban1);

export default function HomeScreen(props) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [tag, setTag] = useState('Relax');
  const [greetings, setGreetings] = useState('');
  const [time, setTime] = useState(null);
  const [quote, setQuote] = useState(null);
  const width = Dimensions.get('window').width;
  const [animationSource, setAnimationSource] = useState(null);
  const loadAnimationSource = source => {
    setAnimationSource(source);
  };
  useEffect(() => {
    const quote = async () => {
      await fetch('https://api.quotable.io/quotes/random?maxLength=70', {
        method: 'GET',
        headers: {'X-Api-Key': 'YYAal+tkb00icmIFEvDZOA==ZYB95zN9geO9hwBz'},
        contentType: 'application/json',
      })
        .then(res => res.json())
        .then(data => {
          setQuote(data[0]);
        });
    };

    setInterval(() => {
      quote();
    }, 22000);

    quote();
  }, []);
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours > 5 && hours < 12) {
      setGreetings('morning');
    } else if (hours > 12 && hours < 18) {
      setGreetings('noon');
    } else {
      setGreetings('evening');
    }
    setInterval(() => {
      const timer = new Date();
      setTime(timer.toLocaleTimeString('en-US'));
    }, 1000);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.userName}>Good </Text>
            {greetings == 'morning' && (
              <Text style={styles.userName}>Morning,</Text>
            )}
            {greetings == 'noon' && (
              <Text style={styles.userName}>After Noon,</Text>
            )}
            {greetings == 'evening' && (
              <Text style={styles.userName}>Evening,</Text>
            )}
            <Text style={styles.timer}>{time}</Text>
          </View>
          <View style={styles.userDetail}>
            {greetings == 'morning' && (
              <LottieView
                style={{width: 120, height: 200}}
                source={require('./common/assets/images/files/noon.json')}
                loop
                autoPlay
              />
            )}
            {greetings == 'noon' && (
              <LottieView
                style={{width: 120, height: 200}}
                source={require('./common/assets/images/files/noon.json')}
                loop
                autoPlay
              />
            )}
            {greetings == 'evening' && (
              <LottieView
                style={{width: 120, height: 200}}
                source={require('./common/assets/images/files/gnight.json')}
                loop
                autoPlay
              />
            )}
          </View>
        </View>
      </View>

      <View
        style={{
          borderRadius: 20,
          borderWidth: 5,
          borderColor: '#fdf8f4',
          overflow: 'hidden',
        }}>
        {quote?.content && (
          <View
            style={{
              zIndex: 99,
              position: 'absolute',
              paddingHorizontal: 10,
              top: '35%',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                alignSelf: 'center',
                fontFamily: fonts.type.NunitoBold,
              }}
              numberOfLines={2}>
              "{quote?.content}"
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                textAlign: 'left',
                marginTop: 5,
              }}>
              ~{quote?.author}
            </Text>
          </View>
        )}

        <LottieView
          style={{width: '100%', height: 250, borderRadius: 20}}
          source={require('./common/assets/images/files/bg2.json')}
          loop
          autoPlay
        />
      </View>

      <View style={styles.catCon}>
        <Text style={styles.catText}>Explore Moods</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{marginTop: 7}}>
          <Pressable style={styles.catBtn} onPress={() => setTag('Relax')}>
            <Text
              style={
                tag === 'Relax' ? styles.activeCatText : styles.deactiveCatText
              }>
              Relax
            </Text>
          </Pressable>

          <Pressable style={styles.catBtn} onPress={() => setTag('Energise')}>
            <Text
              style={
                tag === 'Energise'
                  ? styles.activeCatText
                  : styles.deactiveCatText
              }>
              Energise
            </Text>
          </Pressable>
          <Pressable style={styles.catBtn} onPress={() => setTag('Workout')}>
            <Text
              style={
                tag === 'Workout'
                  ? styles.activeCatText
                  : styles.deactiveCatText
              }>
              Workout
            </Text>
          </Pressable>
          <Pressable style={styles.catBtn} onPress={() => setTag('Focus')}>
            <Text
              style={
                tag === 'Focus' ? styles.activeCatText : styles.deactiveCatText
              }>
              Focus
            </Text>
          </Pressable>
          <Pressable style={styles.catBtn} onPress={() => setTag('Party')}>
            <Text
              style={
                tag === 'Party' ? styles.activeCatText : styles.deactiveCatText
              }>
              Party
            </Text>
          </Pressable>
        </ScrollView>
      </View>
      <ScrollView>
        {musicData?.musicList.map(data => (
          <>
            {data.mood == tag && (
              <View
                key={data.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                  flexWrap: 'wrap',
                }}>
                {data.tracks_group.map(trackGroup => (
                  <Pressable
                    key={trackGroup.id}
                    style={styles.catThumCon}
                    onPress={() =>
                      props.navigation.navigate('DetailScreen', {
                        trackGroup: trackGroup,
                      })
                    }>
                    <View style={styles.productDetail}>
                      <LottieView
                        style={{width: 170, height: 160}}
                        source={Images[trackGroup.avtaar]}
                        loop
                      />
                      <Text style={styles.productName} numberOfLines={2}>
                        {trackGroup.title}
                      </Text>
                      <View style={styles.cartCon}>
                        <Text style={styles.productPrice}>
                          Tracks {trackGroup.tracks.length}
                        </Text>
                        <View style={styles.cartIcon}>
                          <SvgIcon width={20} height={20} icon={'play'} />
                        </View>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
          </>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdf8f4',
    // #fdf8f4
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingVertical: 30,
    alignItems: 'center',
  },
  userDetail: {
    position: 'absolute',
    right: -20,
  },

  userName: {
    color: '#1a1a1a',
    fontFamily: Fonts.type.FredokaOne,
    fontSize: 40,
  },
  profilepic: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  catCon: {
    paddingLeft: 10,
    marginTop: 30,
  },
  catText: {
    color: '#000',
    fontSize: 17,
    fontWeight: '500',
  },
  catBtn: {
    marginRight: 10,
  },
  activeCatText: {
    backgroundColor: '#1e1b1b',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  },
  deactiveCatText: {
    backgroundColor: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  catThumCon: {
    marginVertical: 5,
    height: 250,
    borderRadius: 20,
    backgroundColor: '#fff',
    width: '49%',
  },
  productDetail: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  productName: {
    color: '#000',
    fontFamily: Fonts.type.NunitoBlack,
    textAlign: 'left',
    width: '100%',
    marginTop: 20,
  },
  productPrice: {
    color: '#000',
    fontFamily: Fonts.type.NunitoLight,
    alignSelf: 'center',
    fontSize: 16,
  },
  cartCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cartIcon: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 20,
  },
  card: {
    height: 200,
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 20,
  },
  normalDot: {
    height: 8,
    width: 10,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  timer: {
    color: '#000',
    fontFamily: Fonts.type.NunitoBold,
  },
});
