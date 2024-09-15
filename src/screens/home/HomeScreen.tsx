import { View, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { ReactNode } from 'react'
import ScreenTheme from '../../components/themes';
import Logo from '../../assets/svgs/Logo.svg'
import Search from '../../assets/svgs/Search.svg'
import Messages from '../../assets/svgs/Messages.svg'
import Notifications from '../../assets/svgs/Notifications.svg'
import MiniDiamonds from '../../assets/svgs/MiniDiamonds.svg'
import Heart from '../../assets/svgs/Heart.svg'
import MediaIcon from '../../assets/svgs/MediaIcon.svg'
import ArrowRight from '../../assets/svgs/ArrowRight.svg'
import VideoIcon from '../../assets/svgs/VideoIcon.svg'
import AppText from '../../components/text/AppText';
import { Divider, HeaderIconText, renderIcons, ShadowView } from '../../components/renderHelpers';
import { themeColors } from '../../components/themes/colors';
import { screenHeight, screenWidth } from '../../utils/dimensions';
import Button from '../../components/button/indext';
import { processFontSize } from '../../utils/functions';


export default function HomeScreen({ navigation, route }: any) {
    return (
        <ScreenTheme>
            <Header />
            <ContentHeader />
            {/* Content */}
            <Media />
        </ScreenTheme>
    )
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
    ]

    return (
        <React.Fragment>
            <View style={styles.headerContainer}>
                <View style={styles.rowWrapper}>
                    <Logo />
                    <View style={styles.row}>
                        {
                            headerIcons.map((item, index) => renderIcons(item, index))
                        }

                    </View>
                </View>

            </View>
            <Divider />
        </React.Fragment>
    )
}
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
                        <View style={[styles.row, { justifyContent: 'center' }]} >
                            <AppText center top={3}>
                                Sub Title
                            </AppText>
                            <View style={styles.subTextIcon}>
                                <MiniDiamonds />
                            </View>
                        </View>
                    </View>
                    <View style={styles.arrowWrapper}>
                        <ArrowRight />
                    </View>
                </View>
            </ShadowView>
            <Divider style={styles.dividerContainer} />
        </View>
    )
}

const Media = () => {
    return (
        <>
            <View style={styles.contentWrapper}>
                <HeaderIconText
                    icon={<MediaIcon style={styles.mediaIcon} />}
                    headerText={"Media"}
                />


            </View>

            <ScrollView style={styles.mediaWrapper} horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../../assets/images/image1.png")}
                        style={styles.image}

                    />
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        source={require("../../assets/images/image1.png")}
                        style={styles.image}

                    />
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        source={require("../../assets/images/image1.png")}
                        style={styles.image}

                    />
                </View>

            </ScrollView>
            <View style={styles.contentWrapper}>
                <Button titleComponent={
                    <HeaderIconText
                        icon={<VideoIcon style={styles.mediaIcon} />}
                        headerText={"Upload"}
                        headerStyle={styles.buttonText}
                        wrapperStyle={{ marginTop: 0 }}
                    />

                } style={styles.buttonStyle} />
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
    },
    headerContainer: {
        padding: 15
    },
    contentWrapper: {
        paddingHorizontal: 15
    },
    boxWrapper: {
        backgroundColor: themeColors.lightYellow,
        height: 65,
        borderRadius: 18,
        flexDirection: 'row',
        marginTop: 20
    },
    heartSection: {
        backgroundColor: themeColors.green,
        height: '100%',
        width: '17%',
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardContentSection: {
        flex: 1,
        position: 'relative'
    },
    subTextIcon: {
        marginLeft: 5,
        marginTop: 8
    },
    arrowWrapper: {
        position: 'absolute',
        right: 10,
        top: '40%'
    },
    dividerContainer: {
        marginTop: 30
    },
    marginAlign: {
        marginTop: 10
    },
    mediaIcon: {
        marginTop: 5
    },
    mediaWrapper: {
        marginTop: 20
    },
    imageContainer: {
        height: '100%'
    },
    image: {
        height: screenHeight(37),
        width: screenWidth(46),
        borderRadius: 10,
        resizeMode: 'contain',
        marginRight: 6
    },
    buttonText: {
        color: themeColors.secondary,
        fontSize: processFontSize(14)
    },
    buttonStyle: {
        borderRadius: 7,
    }

})