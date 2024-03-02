import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  Button,
  Pressable,
  BackHandler,
} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  usePlaybackState,
  Event,
  State,
  RepeatMode,
} from 'react-native-track-player';
import LottieView from 'lottie-react-native';
import {setupPlayer, playbackService} from './trackPlayerServices';
import SliderComp from './SliderComp';
import {Images} from './common/styles';
import SvgIcon from './common/assets/images/SvgIcon';
const {width, height} = Dimensions.get('window');

function Header() {
  return (
    <View>
      <LottieView
        style={{width: width, height: height}}
        source={require('.//common/assets/images/files/space.json')}
        autoPlay
        loop
      />
    </View>
  );
}

function Playlist() {
  const [info, setInfo] = useState({});

  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state == State.nextTrack) {
      setTrackInfo();
    }
  });

  async function setTrackInfo() {
    const track = await TrackPlayer.getCurrentTrack();
    const info = await TrackPlayer.getTrack(track);
    setInfo(info);
  }
  return (
    <View style={{position: 'absolute', bottom: 20, width: width}}>
      <Text style={styles.songTitle}>{info?.title}</Text>
      <SliderComp />
      <Controls />
    </View>
  );
}

function Controls() {
  const playerState = usePlaybackState();
  useEffect(() => {
    TrackPlayer.play();
  }, []);
  async function handlePlayPress() {
    if ((await TrackPlayer.getState()) == State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }
  async function handleNextPress() {
    TrackPlayer.skipToNext();
  }
  async function handlePrevPress() {
    TrackPlayer.skipToPrevious();
  }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <Pressable
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => handlePrevPress()}>
        <SvgIcon width={30} height={30} icon={'skipPrev'} />
      </Pressable>
      <Pressable
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
        onPress={() => handlePlayPress()}>
        <LottieView
          style={{width: 70, height: 70}}
          source={
            playerState == State.Playing
              ? require('./common/assets/images/files/pause.json')
              : require('./common/assets/images/files/play.json')
          }
          autoPlay
          loop
        />
      </Pressable>
      <Pressable
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => handleNextPress()}>
        <SvgIcon width={30} height={30} icon={'skipNext'} />
      </Pressable>
    </View>
  );
}

function PlayerScreen(props) {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  TrackPlayer.registerPlaybackService(() => playbackService);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();
      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        let trackData = [];
        props.navigation.getParam('track').forEach((val, index) => {
          trackData.push({
            id: val.id,
            url: val.sources.src,
            title: val.name,
            artist: 'Meditaion',
            duration: val.duration,
            artwork: val.sources.thumbnailUrl, // Load artwork from the network
          });
        });
        console.log(trackData);
        await TrackPlayer.add(trackData);
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
      }
      setIsPlayerReady(isSetup);
    }

    setup();
  }, [props]);

  useEffect(() => {
    const backAction = () => {
      TrackPlayer.reset();
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#bbb" />
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header />
        <Playlist />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  songTitle: {
    fontSize: 32,
    color: '#ccc',
    textAlign: 'center',
  },
  artistName: {
    fontSize: 19,
    color: '#888',
    textAlign: 'center',
  },
});

export default PlayerScreen;
