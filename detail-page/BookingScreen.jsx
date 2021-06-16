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
  Alert
} from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import moment from "moment";

const BookingScreen = ({ route, navigation }) => {
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });

  const [open, setOpen] = useState(false);

  const [numDays, setNumDays] = useState(0)

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const getDiffDays = (date1, date2) => {
    const diffInTime = date2.getTime() - date1.getTime()
    const diffInDays = Math.round(diffInTime / (1000 * 3600 * 24))
    const extra = diffInDays + 1
    if (diffInDays === 0) {
      setNumDays(extra)
    } else {
      setNumDays(diffInDays)
    }
  }

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      if (startDate && !endDate) {
        endDate = startDate;
      }
      setRange({ startDate, endDate });
      getDiffDays(startDate, endDate)
    },
    [setOpen, setRange]
  );

  useEffect(() => {
    navigation.setOptions({ title: route.params.location });
  });

  return (
    <View style={styles.container}>
      <View style={styles.dateBlock}>
        <View style={styles.dateInfo}>
          <Text style={styles.dateTitle}>
            Start Date
          </Text>
          <Text style={styles.dateText}>
            {!range.startDate ? "" : moment(range.startDate).format("LL")}
          </Text>
        </View>
        <View style={styles.dateInfo}>
          <Text style={styles.dateTitle}>
            End Date
          </Text>
          <Text style={styles.dateText}>
            {!range.endDate ? "" : moment(range.endDate).format("LL")}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={styles.pickDateButton}
        >
          <Text style={styles.buttonText}>PICK DATES</Text>
        </TouchableOpacity>
        <DatePickerModal
          locale={"en"}
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={onConfirm}
        />
      </View>

      <View style={styles.paymentBlock}>
        <Text style={styles.paymentTitle}>
          Payment
        </Text>
        <Text style={styles.price}>
          ${numDays * route.params.price}
        </Text>
        <View style={styles.buttonBlock}>
          <TouchableOpacity style={styles.confirmButton} 
                            navigation={navigation}
                            onPress={() => navigation.navigate("Details")}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={() => {
              if (!range.startDate || !range.endDate) {
                Alert.alert("You have not chosen your dates!")
              } else {
                Alert.alert("Confirm booking?", "Payment will be processed upon confirmation",[
                  {
                    text: 'Cancel',
                    onPress: () => navigation.navigate("Booking")
                  },
                  {
                    text: 'Confirm',
                    onPress: () => navigation.navigate("Profile")
                  }
                ])
              }  
            }}
            >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white"
  },

  dateBlock: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center"
  },

  dateInfo: {
    width: "80%",
    height: "22%",
    margin: 10,
    shadowColor: "black",
    shadowRadius: 1,
    shadowOffset: {width: 3,height: 3},
    shadowOpacity: 0.2,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },

  dateTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 30,
    color: "#B4B4B4"
  },

  dateText: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 30
  },

  pickDateButton: {
    width: "40%",
    height: "15%",
    backgroundColor: "#8B8B8B",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 20
  },

  buttonText: {
    color: "white",
    fontWeight: "bold"
  },

  paymentBlock: {
    width: "100%",
    height: "50%",
    backgroundColor: "#EEEEEE",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },

  paymentTitle: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 40
  },

  price: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20
  },

  buttonBlock: {
    width: "90%",
    height: "30%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },

  confirmButton: {
    width: "40%",
    height: "48%",
    backgroundColor: "black",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 20
  }
  /*
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
  */
});

export default BookingScreen;
