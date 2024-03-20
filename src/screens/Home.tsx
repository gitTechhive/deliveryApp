import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootState } from '../store';
import { connect } from 'react-redux';
import { jsonTreeData } from '../utility/storage/tempData';
import { isEmptyObjectOrNullUndefiend } from '../utility/Helper';


interface TreeView {
    name: string;
    title: string;
    children: Array<TreeView>;
}

const Home = (props: any) => {

    const [jsonTreeView, setJsonTreeView] = useState<TreeView>(jsonTreeData as TreeView);
    const [leftPadding, setLeftPadding] = useState<number>(0);

    /**
     * Function to convert a JSON array to a tree view structure.
     * @param {Array<TreeView>} obj - The JSON array to convert to a tree view.
     * @returns {JSX.Element[]} - The tree view structure as JSX elements.
     */
    const convertJsonToTreeView = (obj: Array<TreeView>) => {
        let left = leftPadding + 10;
        return obj.map((item) => (
            !isEmptyObjectOrNullUndefiend(item.children) ? (
                <View style={styles.treeviewbox}>
                    <View style={{ marginLeft: left }}>
                        <Text style={styles.treeviewtitle}>
                            {item.name}
                        </Text>
                        {convertJsonToTreeView(item.children)}
                    </View>
                </View>
            ) : (

                <Text style={{ marginLeft: left, ...styles.treeviewsubtitle }}>
                    {item.name}
                </Text>
            )
        ));
    }

    return (
        <>
            <SafeAreaView style={styles.safeareaview}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.cardheader}>
                        <Text style={styles.cardtitle}>JSON Tree View</Text>
                    </View>
                    <ScrollView>

                        <View style={styles.cardbody}>
                            {convertJsonToTreeView([jsonTreeView])}
                        </View>
                    </ScrollView>
                </View>
            </View>
            </SafeAreaView>
        </>


    )
}

// export default Home

const mapStateToProps = (state: RootState) => {
    return {

    };
};

const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(Home);



const styles = StyleSheet.create({
    safeareaview: {flex:1},
    container: {
        flex: 1,
        backgroundColor: "#FAF9FA",
        padding: 30,
        paddingBottom: 70
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 6,
        overflow: "hidden",
        shadowColor: '#FFF',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    cardheader: {
        backgroundColor: "#0C86EA",
        padding: 10,
    },
    cardtitle: {
        color: "#FFFFFF",
    },
    cardbody: {
        padding: 10,
    },
    treeviewbox: {
        marginBottom: 15,
    },
    treeviewtitle: {
        fontSize: 16,
        marginBottom: 3,
        color: '#000',
        fontWeight: '600'
    },
    treeviewsubtitle: {
        fontSize: 14,
    }
})

