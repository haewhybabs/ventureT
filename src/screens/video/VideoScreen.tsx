import React, { useCallback, useRef, useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList, Dimensions, Text, TouchableOpacity, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import Video from 'react-native-video';
import { selectVideos, selectVideoError, selectVideoLoading } from './videoSlice';
import { themeColors } from '../../components/themes/colors';
import AppText from '../../components/text/AppText';
import CommentIcon from '../../assets/svgs/Comments.svg';
import LikeIcon from '../../assets/svgs/Like.svg';
import Dot3 from '../../assets/svgs/Dots3.svg';
import Media from '../../assets/svgs/RecordingIcon.svg';
import { formatCount } from '../../utils/functions';
import { HEIGHT } from '../../utils/dimensions';


const VideoScreen: React.FC<any> = ({ route }: any) => {
    const videos = useSelector(selectVideos);
    const loading = useSelector(selectVideoLoading);
    const error = useSelector(selectVideoError);
    const flatListRef = useRef<FlatList<any>>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const videoRefs = useRef<any[]>([]); // Array to keep references to each video

    // Get the initial video index from route params
    useEffect(() => {
        const { initialVideoIndex } = route.params || {};
        if (initialVideoIndex !== undefined) {
            setCurrentIndex(initialVideoIndex);
            flatListRef.current?.scrollToIndex({ index: initialVideoIndex, animated: false });
        }
    }, [route.params]);

    const onViewRef = useCallback((viewableItems: any) => {
        if (viewableItems.viewableItems.length > 0) {
            setCurrentIndex(viewableItems.viewableItems[0].index);
        }
    }, []);

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };
    const getItemLayout = (_: any, index: number) => ({
        length: HEIGHT,  // Item height
        offset: HEIGHT * index,  // Offset for each item based on its index
        index,
    });

    const onScrollToIndexFailed = (info: { index: number; highestMeasuredFrameIndex: number; averageItemLength: number; }) => {
        const wait = new Promise(resolve => setTimeout(resolve, 500));
        wait.then(() => {
            if (flatListRef.current) {
                flatListRef.current?.scrollToIndex({ index: info.highestMeasuredFrameIndex, animated: true });
            }
        });
    };

    const renderItem = useCallback(({ item, index }: { item: any, index: number }) => {
        const isCurrentVideo = index === currentIndex;
        const isNextVideo = index === currentIndex + 1;

        return (
            <View style={styles.videoContainer}>
                {(isCurrentVideo || isNextVideo) && (
                    <Video
                        ref={(ref) => { videoRefs.current[index] = ref }}
                        source={{ uri: item.urls.mp4 }}
                        style={styles.video}
                        controls={false}
                        resizeMode="cover"
                        onLoad={() => { }}
                        onEnd={() => {
                            videoRefs.current[index]?.seek(0); // Restart video when it ends
                        }}
                        playInBackground={false}
                        playWhenInactive={false}
                        paused={!isCurrentVideo}  // Only play the current video
                        onBuffer={() => console.log('Buffering')}  // Handle buffering
                        onError={(e) => console.log('Error loading video', e)}  // Handle error
                    />
                )}

                <TouchableOpacity style={styles.topLeftContent}>
                    <AppText size={23} weight='semibold' color={themeColors.white}>Media</AppText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.topRightContent}>
                    <Media />
                </TouchableOpacity>

                {/* Like and Comment count */}
                <View style={styles.likeLoveContainer}>
                    <View style={styles.likeLoveItem}>
                        <LikeIcon />
                        <AppText weight='semibold' color={themeColors.secondary}>
                            {formatCount(item.likes_count)}
                        </AppText>
                    </View>
                    <View style={styles.likeLoveItem}>
                        <CommentIcon />
                        <AppText weight='semibold' color={themeColors.secondary}>
                            {formatCount(item.comments_count)}
                        </AppText>
                    </View>

                    <View style={styles.likeLoveItem}>
                        <Dot3 />
                    </View>
                </View>
            </View>
        );
    }, [currentIndex]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <AppText style={styles.text}>Loading videos...</AppText>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <AppText style={styles.text}>Error: {error}</AppText>
            </View>
        );
    }

    return (
        <FlatList
            ref={flatListRef}
            data={videos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            pagingEnabled
            snapToInterval={HEIGHT}
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            onViewableItemsChanged={onViewRef}
            viewabilityConfig={viewabilityConfig}
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            windowSize={2}
            removeClippedSubviews={true}
            getItemLayout={getItemLayout}  // Provide item layout for efficient scrolling
            onScrollToIndexFailed={onScrollToIndexFailed}  // Handle scroll failures
        />
    );
};

const headerTopValue = Platform.OS === 'ios' ? 80 : 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoContainer: {
        height: HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    text: {
        color: themeColors.secondary
    },
    likeLoveContainer: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        flexDirection: 'column',
        alignItems: 'center',
    },
    likeLoveItem: {
        marginVertical: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    likeLoveText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    topLeftContent: {
        position: 'absolute',
        top: headerTopValue,
        left: 20,
    },
    topRightContent: {
        position: 'absolute',
        top: headerTopValue,
        right: 20,
    }
});

export default VideoScreen;
