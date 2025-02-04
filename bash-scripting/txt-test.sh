#!/bin/sh

[ -z $GTKDIALOG ] && GTKDIALOG=gtkdialog

MAIN_DIALOG='
<window>
			<vbox>
				<text justify="2">
					<label>"This text is centre justified relative to
the other lines within this text"</label>
				</text>
				<hseparator></hseparator>
				<text xalign="0" max-width-chars="20">
					<label>The desired maximum width of the text, in characters.</label>
				</text>
				<hseparator></hseparator>
				<text xalign="0" width-chars="20">
					<label>The desired width of the text, in characters.</label>
				</text>
				<hseparator></hseparator>
				<text xalign="0" pattern="This ____ includes ____ underlined _____.">
					<label>This text includes some underlined words.</label>
				</text>
				<hseparator></hseparator>
				<text xalign="0" selectable="true">
					<label>This text can be selected and will be selected by default if it has the focus (press Tab to move the focus here from the OK button).</label>
				</text>
				<hseparator></hseparator>
				<text use-markup="true">
					<label>"<span fgcolor='"'darkred'"'><b>This</b></span> <s>text</s> <i>includes</i> <span fgcolor='"'darkgreen'"'>XML</span> <u>markup</u>."</label>
				</text>
			</vbox>
</window>
'
export MAIN_DIALOG

case $1 in
	-d | --dump) echo "$MAIN_DIALOG" ;;
	*) $GTKDIALOG --program=MAIN_DIALOG ;;
esac
