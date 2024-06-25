import { Component, ReactNode, createElement } from "react";
import { TextStyle, ViewStyle } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { OneTimePasswordEntry } from "./components/OneTimePasswordEntryContainer";
import { ReactNativeOneTimePasswordEntryProps } from "../typings/ReactNativeOneTimePasswordEntryProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export class ReactNativeOneTimePasswordEntry extends Component<ReactNativeOneTimePasswordEntryProps<CustomStyle>> {
    render(): ReactNode {
        return <OneTimePasswordEntry
                    attribute={this.props.attribute}
                    otpLength={this.props.otpLength}
                    styleBorderBottomColor={this.props.styleBorderBottomColor}
                    style={this.props.style}
                />;
    }
}
