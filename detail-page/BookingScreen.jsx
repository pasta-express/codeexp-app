import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ScrollView
} from "react-native";
import { DatePickerModal } from 'react-native-paper-dates';
import moment from 'moment'
  
import { Card, FAB, Button } from 'react-native-paper'


const BookingScreen = () => {
  const [range, setRange] = useState({ startDate: undefined, endDate: undefined})

  const [open, setOpen] = useState(false)

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      if (startDate && !endDate) {
        endDate = startDate
      }
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );

  const ButtonRow = () => {
    return (
      <View style={styles.buttonRow}>
        <Button>
          Cancel
        </Button>
        <Button>
          {/*on confirm will take the user to the myprofile screen, and the info of the booking will be made there. We ignore payment methods for now*/}
          Confirm
        </Button>
      </View>
    )
  }

  const DatesRow = () => {
    return (
      <View>
        <Text style={styles.dateText}>Start Date {!range.startDate ? '' : moment(range.startDate).format('LL')}</Text>
        <Text style={styles.dateText}>End Date {!range.endDate ? '' : moment(range.endDate).format('LL')}</Text>
      </View>
    )
  }
  
  return (
    <Card style={styles.box}>
      <Button onPress={() => setOpen(true)} uppercase={true} mode="outlined" style={styles.dateButton}>
        Pick Dates
      </Button>
      <DatesRow />
      <Text>$Price</Text>
      <ButtonRow />
      <DatePickerModal
        locale={'en'}
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm} />
    </Card>
  )
}

const styles = StyleSheet.create({
  dateButton: {
    backgroundColor: '#c4c4c4',
    padding: 20,
    margin: 20,
    width: '80%',
    alignContent: 'center'
  },
  dateText: {
    fontSize: 24,
    padding: 10
  },
  box: {
    //this is the text box
    backgroundColor: 'white',
    width: '95%',
    marginLeft: '2.5%',
    paddingHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  buttonRow: {
    flexDirection: 'row'
  }
})

export default BookingScreen