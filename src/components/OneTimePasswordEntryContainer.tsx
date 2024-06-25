import { Component, createElement, ReactNode } from "react";
import { View, StyleSheet, Text } from "react-native";
import { EditableValue } from "mendix";
import { CodeField, Cursor } from "react-native-confirmation-code-field";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { CustomStyle } from "../ReactNativeOneTimePasswordEntry";

export interface OneTimePasswordEntryProps {
    attribute: EditableValue<string>;
    otpLength: number;
    styleBorderBottomColor: string;
    style: CustomStyle[];
}

interface OneTimePasswordEntryState {
    value: string;
}

const defaultStyle: CustomStyle = {
    container: {},
    label: {
        color: "#F6BB42"
    }
};

const otpStyles = StyleSheet.create({
  codeFieldRoot: { width: "100%" },
  cell: {
    width: 30,
    height: 30,
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 2
  },
  cellText: {
    lineHeight: 30,
    fontSize: 24,
    textAlign: 'center',
    color: '#000000'
  },
  focusCell: {
    borderColor: '#000',
  },
});

export class OneTimePasswordEntry extends Component<OneTimePasswordEntryProps, OneTimePasswordEntryState> {
    constructor(props: OneTimePasswordEntryProps | Readonly<OneTimePasswordEntryProps>) {
        super(props);
        this.state = {
          value: '',
        };
      }
    
      setValue = (newValue: any) => {
        this.setState({ value: newValue });
        this.props.attribute.setTextValue(newValue);
      };
  
      render(): ReactNode {
          const { value } = this.state;
          const mergedStyles = mergeNativeStyles(defaultStyle, this.props.style);
          
          const CELL_COUNT = this.props.otpLength;
  
          const cellStyle = {
              borderColor: this.props.styleBorderBottomColor !== undefined && this.props.styleBorderBottomColor !== '' ? this.props.styleBorderBottomColor : "#D7D7D7",
          };
  
          return (
              <View
                    style={
                        [
                            mergedStyles.container,
                            {
                                paddingLeft: 10,
                                paddingRight: 10
                            }
                        ]
                    }
                >
                <CodeField
                  value={value}
                  onChangeText={this.setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={otpStyles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <View key={index} style={[otpStyles.cell, cellStyle, isFocused && otpStyles.focusCell]}>
                        <Text style={otpStyles.cellText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                  )}
                />
              </View>
          );
      }
}
