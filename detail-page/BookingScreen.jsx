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
import moment from "moment";

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
          labelStyle={{ color: "black" }}
          style={{ height: "50%", justifyContent: "center" }}
          contentStyle={styles.cancelButton}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          labelStyle={{ color: "black" }}
          style={{ height: "50%", justifyContent: "center" }}
          contentStyle={styles.confirmButtion}
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
        <ButtonRow />
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
    justifyContent: "flex-start",
    width: NORMAL_WIDTH,
  },
  box: {
    backgroundColor: "white",
    width: "95%",
    paddingHorizontal: 8,
    marginTop: "50%",
    borderRadius: 20,
    borderWidth: 1,
    flex: 0.6,
    borderColor: "black",
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "row",
  },
  dateButton: {
    flex: 0.5,
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
  buttonRow: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "flex-end",
    height: 1,
  },
  cancelButton: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    backgroundColor: "#c4c4c4",
    height: "100%",
  },
  confirmButtion: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    height: "100%",
    borderWidth: 2,
  },
});

export default BookingScreen;
