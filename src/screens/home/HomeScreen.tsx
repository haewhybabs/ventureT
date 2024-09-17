import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import ScreenTheme from '../../components/themes';
import Logo from '../../assets/svgs/Logo.svg';
import Search from '../../assets/svgs/Search.svg';
import Messages from '../../assets/svgs/Messages.svg';
import Notifications from '../../assets/svgs/Notifications.svg';
import MiniDiamonds from '../../assets/svgs/MiniDiamonds.svg';
import Heart from '../../assets/svgs/Heart.svg';
import MediaIcon from '../../assets/svgs/MediaIcon.svg';
import ArrowRight from '../../assets/svgs/ArrowRight.svg';
import VideoIcon from '../../assets/svgs/VideoIcon.svg';
import AppText from '../../components/text/AppText';
import { Divider, HeaderIconText, renderIcons, ShadowView } from '../../components/renderHelpers';
import { themeColors } from '../../components/themes/colors';
import { screenHeight, screenWidth } from '../../utils/dimensions';
import Button from '../../components/button/indext';
import { processFontSize } from '../../utils/functions';
import { useSelector } from 'react-redux';
import { selectVideoError, selectVideoLoading, selectVideos } from '../video/videoSlice';
import { createThumbnail } from 'react-native-create-thumbnail';
import { useFocusEffect } from '@react-navigation/native';


export default function HomeScreen({ navigation, route }: any) {
    const videos = useSelector(selectVideos);
    const loading = useSelector(selectVideoLoading);
    const error = useSelector(selectVideoError);


    const [thumbnails, setThumbnails] = useState<any>({});  // To store the generated thumbnails

    useEffect(() => {
        // Generate thumbnails when videos data changes
        videos.forEach((video: any) => {
            if (!thumbnails[video.id]) {
                createThumbnail({ url: video.urls.mp4 })
                    .then((response) => {
                        setThumbnails((prev: any) => ({ ...prev, [video.id]: response.path }));
                    })
                    .catch(err => console.log({ err }));
            }
        });
    }, [videos]);

    useFocusEffect(
        useCallback(() => {
            const backAction = () => {
                Alert.alert('Exit App', 'Are you sure you want to exit?', [
                    { text: 'Cancel' },
                    { text: 'Yes', onPress: () => BackHandler.exitApp() },
                ]);
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );

            return () => backHandler.remove();
        }, []),
    );
    const renderHorizontalMedia = () => (
        <FlatList
            data={videos}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
                const thumbnailPath = thumbnails[item.id];  // Get the generated thumbnail

                return (
                    <>
                        {
                            (!thumbnailPath || loading) ? (  // Show loader if loading or no thumbnail
                                <ActivityIndicator size={'large'} />
                            ) : (
                                <Pressable
                                    onPress={() => {
                                        // Find the index of the clicked video
                                        const videoIndex = videos.findIndex((video: any) => video.id === item.id);

                                        // Navigate to VideoPlayerScreen with the video URL and index
                                        const params = {
                                            videoUrl: item.urls.mp4,
                                            initialVideoIndex: videoIndex
                                        }
                                        console.log('params', params);
                                        navigation.navigate('Media', params);
                                    }}
                                    style={styles.imageContainer}
                                >
                                    <Image
                                        source={{ uri: thumbnailPath }}  // Display the generated thumbnail
                                        style={styles.image}
                                    />
                                </Pressable>
                            )
                        }
                    </>
                );
            }}
            showsHorizontalScrollIndicator={false}
        />
    );

    const renderFooter = () => (
        <View style={styles.contentWrapper}>
            <Button
                titleComponent={
                    <HeaderIconText
                        icon={<VideoIcon style={styles.mediaIcon} />}
                        headerText={"Upload"}
                        headerStyle={styles.buttonText}
                        wrapperStyle={{ marginTop: 0 }}
                    />
                }
                style={styles.buttonStyle}
            />
        </View>
    );

    return (
        <ScreenTheme>
            <FlatList
                ListHeaderComponent={() => (
                    <>
                        <Header />
                        <ContentHeader />
                        <View style={styles.contentWrapper}>
                            <HeaderIconText
                                icon={<MediaIcon style={styles.mediaIcon} />}
                                headerText={"Media"}
                            />
                        </View>
                        {renderHorizontalMedia()}
                    </>
                )}
                ListFooterComponent={renderFooter}
                renderItem={null}
                data={[]}  // Placeholder, no vertical list data, as the content is in header and footer
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </ScreenTheme>
    );
}

const Header = () => {
    const headerIcons = [
        {
            onPress: () => console.log('search'),
            icon: <Search />
        },
        {
            onPress: () => console.log('Messages'),
            icon: <Messages />
        },
        {
            onPress: () => console.log('Notifications'),
            icon: <Notifications />
        },
    ];

    return (
        <React.Fragment>
            <View style={styles.headerContainer}>
                <View style={styles.rowWrapper}>
                    <Logo />
                    <View style={styles.row}>
                        {headerIcons.map((item, index) => renderIcons(item, index))}
                    </View>
                </View>
            </View>
            <Divider />
        </React.Fragment>
    );
};

const ContentHeader = () => {
    return (
        <View style={styles.contentWrapper}>
            <AppText center weight='bold' size={22}> Hello John,</AppText>
            <AppText size={18} top={20} weight='semibold'>Please tap below</AppText>
            <ShadowView style={styles.boxWrapper}>
                <View style={styles.heartSection}>
                    <Heart />
                </View>
                <View style={styles.cardContentSection}>
                    <View>
                        <AppText weight='semibold' size={17} top={10} center>Large Font Title</AppText>
                        <View style={[styles.row, { justifyContent: 'center' }]}>
                            <AppText center top={3}>Sub Title</AppText>
                            <View style={styles.subTextIcon}>
                                <MiniDiamonds />
                            </View>
                        </View>
                    </View>

                </View>

                <View style={styles.arrowWrapper}>
                    <ArrowRight />
                </View>
            </ShadowView>
            <Divider style={styles.dividerContainer} />
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: 20,
    },
    rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
    },
    headerContainer: {
        padding: 15,
    },
    contentWrapper: {
        paddingHorizontal: 15,
    },
    boxWrapper: {
        backgroundColor: themeColors.lightYellow,
        height: 65,
        borderRadius: 18,
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between'
    },
    heartSection: {
        backgroundColor: themeColors.green,
        height: '100%',
        width: '17%',
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContentSection: {
        flex: 1,
        position: 'relative',
    },
    subTextIcon: {
        marginLeft: 5,
        marginTop: 8,
    },
    arrowWrapper: {

        right: 10,
        padding: 10,
        justifyContent: 'center'

    },
    dividerContainer: {
        marginTop: 30,
    },
    mediaWrapper: {
        marginTop: 20,
    },
    imageContainer: {
        marginRight: 10,
        marginTop: 20
    },
    image: {
        height: screenHeight(37),
        width: screenWidth(46),
        borderRadius: 10,
        resizeMode: 'contain',
    },
    buttonText: {
        color: themeColors.secondary,
        fontSize: processFontSize(14),
    },
    buttonStyle: {
        borderRadius: 7,
        marginTop: 30
    },
    mediaIcon: {
        marginTop: 5
    },
});
