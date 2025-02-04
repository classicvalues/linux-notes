var PhoneUtil = {};
(function() {
    const exampleNumbers = {
        '1': ['(201) 555-0123', '(201) 555-0123'],
        '7': ['8 (301) 123-45-67', '8 (912) 345-67-89'],
        '20': ['02 34567890', '0100 123 4567'],
        '27': ['010 123 4567', '071 123 4567'],
        '30': ['21 2345 6789', '691 234 5678'],
        '31': ['010 123 4567', '06 12345678'],
        '32': ['012 34 56 78', '0470 12 34 56'],
        '33': ['01 23 45 67 89', '06 12 34 56 78'],
        '34': ['810 12 34 56', '612 34 56 78'],
        '36': ['(1) 234 5678', '(20) 123 4567'],
        '39': ['02 1234 5678', '312 345 6789'],
        '40': ['021 123 4567', '0712 034 567'],
        '41': ['021 234 56 78', '078 123 45 67'],
        '43': ['01 234567890', '0664 123456'],
        '44': ['0121 234 5678', '07400 123456'],
        '45': ['32 12 34 56', '32 12 34 56'],
        '46': ['08-12 34 56', '070-123 45 67'],
        '47': ['21 23 45 67', '406 12 345'],
        '48': ['12 345 67 89', '512 345 678'],
        '49': ['030 123456', '01512 3456789'],
        '51': ['(01) 1234567', '912 345 678'],
        '52': ['01 222 123 4567', '044 222 123 4567'],
        '53': ['(07) 1234567', '05 1234567'],
        '54': ['011 2345-6789', '011 15-2345-6789'],
        '55': ['(11) 2345-6789', '(11) 96123-4567'],
        '56': ['(2) 2123 4567', '(2) 2123 4567'],
        '57': ['(1) 2345678', '321 1234567'],
        '58': ['0212-1234567', '0412-1234567'],
        '60': ['03-2385 6789', '012-345 6789'],
        '61': ['(02) 1234 5678', '0412 345 678'],
        '62': ['(021) 8350123', '0812-345-678'],
        '63': ['(02) 123 4567', '0905 123 4567'],
        '64': ['03-234 5678', '021 123 4567'],
        '65': ['6123 4567', '8123 4567'],
        '66': ['02 123 4567', '081 234 5678'],
        '81': ['03-1234-5678', '090-1234-5678'],
        '82': ['02-212-3456', '010-0000-0000'],
        '84': ['0210 1234 567', '091 234 56 78'],
        '86': ['010 1234 5678', '131 2345 6789'],
        '90': ['(0212) 345 67 89', '0501 234 56 78'],
        '91': ['074104 10123', '081234 56789'],
        '92': ['(021) 23456789', '0301 2345678'],
        '93': ['023 456 7890', '070 123 4567'],
        '94': ['0112 345 678', '071 234 5678'],
        '95': ['01 234 567', '09 212 3456'],
        '98': ['021 2345 6789', '0912 345 6789'],
        '211': ['0181 234 567', '0977 123 456'],
        '212': ['0520-123456', '0650-123456'],
        '213': ['012 34 56 78', '0551 23 45 67'],
        '216': ['30 010 123', '20 123 456'],
        '218': ['021-2345678', '091-2345678'],
        '220': ['566 1234', '301 2345'],
        '221': ['30 101 23 45', '70 123 45 67'],
        '222': ['35 12 34 56', '22 12 34 56'],
        '223': ['20 21 23 45', '65 01 23 45'],
        '224': ['30 24 12 34', '601 12 34 56'],
        '225': ['21 23 45 67', '01 23 45 67'],
        '226': ['20 49 12 34', '70 12 34 56'],
        '227': ['20 20 12 34', '93 12 34 56'],
        '228': ['22 21 23 45', '90 11 23 45'],
        '229': ['20 21 12 34', '90 01 12 34'],
        '230': ['5448 0123', '5251 2345'],
        '231': ['021 234 567', '077 012 3456'],
        '232': ['(022) 221234', '(025) 123456'],
        '233': ['030 234 5678', '023 123 4567'],
        '234': ['01 804 0123', '0802 123 4567'],
        '235': ['22 50 12 34', '63 01 23 45'],
        '236': ['21 61 23 45', '70 01 23 45'],
        '237': ['2 22 12 34 56', '6 71 23 45 67'],
        '238': ['221 12 34', '991 12 34'],
        '239': ['222 1234', '981 2345'],
        '240': ['333 091 234', '222 123 456'],
        '241': ['01 44 12 34', '06 03 12 34'],
        '242': ['22 212 3456', '06 123 4567'],
        '243': ['012 34567', '0991 234 567'],
        '244': ['222 123 456', '923 123 456'],
        '245': ['443 201 234', '955 012 345'],
        '246': ['370 9100', '380 1234'],
        '248': ['4 217 123', '2 510 123'],
        '249': ['015 123 1234', '091 123 1234'],
        '250': ['250 123 456', '0720 123 456'],
        '251': ['011 111 2345', '091 123 4567'],
        '252': ['4 012345', '7 1123456'],
        '253': ['21 36 00 03', '77 83 10 01'],
        '254': ['020 2012345', '0712 123456'],
        '255': ['022 234 5678', '0621 234 567'],
        '256': ['031 2345678', '0712 345678'],
        '257': ['22 20 12 34', '79 56 12 34'],
        '258': ['21 123 456', '82 123 4567'],
        '260': ['0211 234 567', '095 5123456'],
        '261': ['020 21 234 56', '032 12 345 67'],
        '262': ['0262 16 12 34', '0692 12 34 56'],
        '263': ['013 12345', '071 234 5678'],
        '264': ['061 221 234', '081 123 4567'],
        '265': ['01 234 567', '0991 23 45 67'],
        '266': ['2212 3456', '5012 3456'],
        '267': ['240 1234', '71 123 456'],
        '268': ['2217 1234', '7612 3456'],
        '269': ['771 23 45', '321 23 45'],
        '290': ['22158', '51234'],
        '291': ['08 370 362', '07 123 456'],
        '297': ['521 2345', '560 1234'],
        '298': ['201234', '211234'],
        '299': ['32 10 00', '22 12 34'],
        '350': ['200 12345', '57123456'],
        '351': ['21 234 5678', '912 345 678'],
        '352': ['27 12 34 56', '628 123 456'],
        '353': ['(022) 12345', '085 012 3456'],
        '354': ['410 1234', '611 1234'],
        '355': ['022 345 678', '066 212 3456'],
        '356': ['2100 1234', '9696 1234'],
        '357': ['22 345678', '96 123456'],
        '358': ['013 1234567', '041 2345678'],
        '359': ['02 123 456', '048 123 456'],
        '370': ['(8-312) 34567', '(8-612) 34567'],
        '371': ['63 123 456', '21 234 567'],
        '372': ['321 2345', '5123 4567'],
        '373': ['022 212 345', '0621 12 345'],
        '374': ['(010) 123456', '077 123456'],
        '375': ['8 0152 45-09-11', '8 029 491-19-11'],
        '376': ['712 345', '312 345'],
        '377': ['99 12 34 56', '06 12 34 56 78'],
        '378': ['0549 886377', '66 66 12 12'],
        '380': ['03112 34567', '039 123 4567'],
        '381': ['010 234567', '060 1234567'],
        '382': ['030 234 567', '067 622 901'],
        '385': ['01 2345 678', '092 123 4567'],
        '386': ['(01) 123 45 67', '031 234 567'],
        '387': ['030 212-345', '061 123 456'],
        '389': ['02 201 2345', '072 345 678'],
        '420': ['212 345 678', '601 123 456'],
        '421': ['02/212 345 67', '0912 123 456'],
        '423': ['234 56 78', '660 234 567'],
        '500': ['31234', '51234'],
        '501': ['222-1234', '622-1234'],
        '502': ['2245 6789', '5123 4567'],
        '503': ['2123 4567', '7012 3456'],
        '504': ['2212-3456', '9123-4567'],
        '505': ['2123 4567', '8123 4567'],
        '506': ['2212 3456', '8312 3456'],
        '507': ['200-1234', '6123-4567'],
        '508': ['043 01 23', '055 12 34'],
        '509': ['22 45 3300', '34 10 1234'],
        '590': ['0590 20 12 34', '0690 00 12 34'],
        '591': ['2 2123456', '71234567'],
        '592': ['220 1234', '609 1234'],
        '593': ['(02) 212-3456', '099 123 4567'],
        '594': ['0594 10 12 34', '0694 20 12 34'],
        '595': ['(021) 234 5678', '0961 456789'],
        '596': ['0596 30 12 34', '0696 20 12 34'],
        '597': ['211-234', '741-2345'],
        '598': ['2123 1234', '094 231 234'],
        '599': ['9 415 1234', '9 518 1234'],
        '670': ['211 2345', '7721 2345'],
        '672': ['10 6609', '3 81234'],
        '673': ['234 5678', '712 3456'],
        '674': ['444 1234', '555 1234'],
        '675': ['312 3456', '7012 3456'],
        '676': ['20-123', '771 5123'],
        '677': ['40123', '74 21234'],
        '678': ['22123', '591 2345'],
        '679': ['321 2345', '701 2345'],
        '680': ['277 1234', '620 1234'],
        '681': ['50 12 34', '50 12 34'],
        '682': ['21 234', '71 234'],
        '683': ['7012', '888 4012'],
        '685': ['22123', '72 12345'],
        '686': ['31234', '72001234'],
        '687': ['20.12.34', '75.12.34'],
        '688': ['20123', '901234'],
        '689': ['40 41 23 45', '87 12 34 56'],
        '690': ['3101', '7290'],
        '691': ['320 1234', '350 1234'],
        '692': ['247-1234', '235-1234'],
        '850': ['02 123 4567', '0192 123 4567'],
        '852': ['2123 4567', '5123 4567'],
        '853': ['2821 2345', '6612 3456'],
        '855': ['023 756 789', '091 234 567'],
        '856': ['021 212 862', '020 23 123 456'],
        '870': ['872 762337766', '872 762337766'],
        '880': ['02-7111234', '01812-345678'],
        '886': ['02 2123 4567', '0912 345 678'],
        '960': ['670-1234', '771-2345'],
        '961': ['01 123 456', '71 123 456'],
        '962': ['(06) 200 1234', '07 9012 3456'],
        '963': ['011 234 5678', '0944 567 890'],
        '964': ['01 234 5678', '0791 234 5678'],
        '965': ['2234 5678', '500 12345'],
        '966': ['011 234 5678', '051 234 5678'],
        '967': ['01 234 567', '0712 345 678'],
        '968': ['23 123456', '9212 3456'],
        '970': ['02 223 4567', '0599 123 456'],
        '971': ['02 234 5678', '050 123 4567'],
        '972': ['02-123-4567', '050-234-5678'],
        '973': ['1700 1234', '3600 1234'],
        '974': ['4412 3456', '3312 3456'],
        '975': ['2 345 678', '17 12 34 56'],
        '976': ['5012 3456', '8812 3456'],
        '977': ['01-4567890', '984-1234567'],
        '992': ['372 12 3456', '917 12 3456'],
        '993': ['(8 12) 34-56-78', '8 66 123456'],
        '994': ['(012) 312 34 56', '040 123 45 67'],
        '995': ['0322 12 34 56', '555 12 34 56'],
        '996': ['0312 123 456', '0700 123 456'],
        '998': ['8 66 905 01 23', '8 91 234 56 78']
    };

    // Get an example number for the given country region code
    this.getExampleNumber = function(regionCode, mobile) {
        let number = exampleNumbers[regionCode] || exampleNumbers['1'];
        return (mobile ? number[1] : number[0]);
    }

    // As-you-type formatter to format phone number string
    this.formatNumberInput = function(regionCode, mobile, phoneNumber, isBackspace) {
        let example = this.getExampleNumber(regionCode, mobile);
        let currentDigits = phoneNumber.replace(/[^0-9]/g, '');
        let hasDigits = (currentDigits.length > 0);
        let i=0;
        let newval = '';
        while (currentDigits.length > 0) {
            // Add any formatting characters before the next digit
            while (i<example.length && example.charAt(i).match(/[^0-9]/)) {
                newval += example.charAt(i++);
            }
            // Add the next digit
            newval += currentDigits[0];
            i++;
            currentDigits = currentDigits.substr(1);
        }
        if (!isBackspace && hasDigits) {
            // Add any formatting characters after the last digit
            while (i<example.length && example.charAt(i).match(/[^0-9]/)) {
                newval += example.charAt(i++);
            }
        }
        return newval;
    }

    // Splits a formatted national phone number string into a two element array of
    // the national destination code (e.g. area code in US) and subscriber number
    this.splitPhoneNumberString = function(phoneNumber) {
        let match = /([0-9]+)[^0-9]+?(.*)/.exec(phoneNumber);
        if (!match) {
            return ['', phoneNumber];
        }
        return match.slice(1, 3);
    }
}).apply(PhoneUtil);
