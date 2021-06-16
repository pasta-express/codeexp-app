import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
//import moment from "moment";

import { Card, Button } from "react-native-paper";

const NORMAL_WIDTH = Dimensions.get("window").width;

const BookingScreen = ({ navigation }) => {
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });

  const [open, setOpen] = useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      if (startDate && !endDate) {
        endDate = startDate;
      }
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );

  useEffect(() => {
    navigation.setOptions({ title: "Name of the location" });
  });

  const ButtonRow = () => {
    return (
      <View style={styles.buttonRow}>
        <Button
          mode="contained"
          style={styles.cancelButton}
          onPress={() => navigation.navigate("Details")}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          style={styles.confirmButtion}
        >
          {/*on confirm will take the user to the myprofile screen, and the info of the booking will be made there. We ignore payment methods for now*/}
          Confirm
        </Button>
      </View>
    );
  };

  const DatesRow = () => {
    return (
      <View style={styles.datesRow}>
        <Text style={styles.dateText}>
          Start Date:{" "}
          {!range.startDate ? "" : moment(range.startDate).format("LL")}
        </Text>
        <Text style={styles.dateText}>
          End Date: {!range.endDate ? "" : moment(range.endDate).format("LL")}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Card style={styles.box}>
        <Button
          onPress={() => setOpen(true)}
          uppercase={true}
          mode="contained"
          labelStyle={{ color: "black" }}
          style={styles.dateButton}
          contentStyle={{
            backgroundColor: "#c4c4c4",
            width: "100%",
            height: "100%",
          }}
        >
          Pick Dates
        </Button>
        <DatesRow />
        <Text style={styles.priceText}>Price: $140</Text>
        <ButtonRow navigation={navigation} />
        <DatePickerModal
          locale={"en"}
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={onConfirm}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9fa3cc",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  box: {
    backgroundColor: "white",
    width: "95%",
    height: "50%",
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "grey",
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "row",
  },
  dateButton: {
    width: "100%",
    height: 60,
    marginTop: 20,
    justifyContent: "center",
  },
  dateText: {
    fontSize: 24,
    padding: 10,
  },
  priceText: {
    fontSize: 24,
    padding: 10,
  },

  datesRow: {
    marginTop: 10,
  },
  
  buttonRow: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: "10%",

  },
  cancelButton: {
    color: "white",
    backgroundColor: "black",
    height: "100%",
    borderRadius: 20,
    width: "35%"
  },
  confirmButtion: {
    height: "100%",
    backgroundColor: "black",
    color: "white",
    borderRadius: 20,
    textAlign: "center",
    width: "35%",
    
  },
});

export default BookingScreen;
