//-------------------------------------------------------------------------
// Copyright © 2021 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//-------------------------------------------------------------------------
import { b64encode } from 'k6/encoding';

let SEGMENT_END = "\x0d"; // Carriage Return is the standard segment terminator for HL7v2.
let MSH_START = "MSH|^~&\\|"; // escape the escape back-slash to make sure the back slash (ASCII 92) is part of the payload.

/*export let MedicationRequest_ZPN_TRX_X0 = "MSH|^~\&|DESKTOP|EMR|DESKTOP|EMRMD|||ZPN^^|691365|P|2.1||" + "\r" +
"ZCA||70|X0|MA|01|" + "\r" +
"ZCB|LDJQQ|140827|691365"  + "\r" +
"ZCC||||||||||000nnnnnnnnnn|"  + "\r" +
"ZPR|||||||||||"  + "\r" +
"ZZZ|TRX||691365|P1|nnnnnnnnnn|||||ZZZ1"; */

export let MedicationRequest_ZPN_TRX_X0 = 
MSH_START + "1234567|1234567||EMRMD|${{ timestamp }}|userID:192.168.0.1|ZPN|1112|P|2.1||" + SEGMENT_END +
"ZCA||70|X0|QA|01|" + SEGMENT_END +
"ZCB|QAEMRMD|210317|1112" + SEGMENT_END +
"ZCC||||||||||0009698713408|" + SEGMENT_END+
"ZPR|||||||||||" + SEGMENT_END +
"ZZZ|TRX||1112|91|XXANV|||||ZZZ1^" + SEGMENT_END + SEGMENT_END;

export let MedicationRequest_ZPN_TRX_X0_sample2 = 
MSH_START + "1234567|1234567||ERXPP|${{ timestamp }}|userID:192.168.0.1|ZPN|125|P|2.1||"  + SEGMENT_END +
"ZCA||70|X0|M1|04|"  + SEGMENT_END +
"ZCB|AAA|110916|0215"  + SEGMENT_END +
"ZCC||||||||||000nnnnnnnnnn|"  + SEGMENT_END +
"ZPR|1047||||||||||"  + SEGMENT_END +
"ZZZ|TRX||545132|91|nnnnnnnnnn||||" + SEGMENT_END + SEGMENT_END;

export let MedicationStatement_ZPN_TRP_00 = 
MSH_START + "TRXTOOL|PCARESUP|PNP|PP|${{ timestamp }}|userID:192.168.0.1|ZPN|3365|P|2.1||" + SEGMENT_END + 
"ZZZ|TRP||3365|P1|3E9V1|||PHSVE105|" + SEGMENT_END +
"ZCA||03|00|KC|13|ZCB|BC00007007|200916|3365|" + SEGMENT_END + 
"ZCC||||||||||0009388880284|" + SEGMENT_END + SEGMENT_END;

export let MedicationStatement_ZPN_TRS_00 = 
MSH_START + "TRXTOOL|PCARESUP|PNP|PP|${{ timestamp }}|userID:192.168.0.1|ZPN|3371|P|2.1||" + SEGMENT_END +
"ZZZ|TRS||3371|P1|1D5T2|||RAHIMAN|" + SEGMENT_END +
"ZCA||03|00|KC|13|ZCB|BC00007007|200916|3371|" + SEGMENT_END +
"ZCC||||||||||0009427405543|" + SEGMENT_END + SEGMENT_END;


export let Medication_ZPN_TDR = 
MSH_START + "TRXTOOL|PCARESUP|PNP|PP|||ZPN|9286|P|2.1||" + SEGMENT_END + 
"ZZZ|TDR||9286|P1|2F3P2||||" + SEGMENT_END +
"ZCA||03|00|KC|13|" + SEGMENT_END +
"ZCB|BC00007007|201222|9286" + SEGMENT_END +
"ZPC|2240579||||||Y|ZPC1^^^766720" + SEGMENT_END + SEGMENT_END;

export let Patient_ZPN_TID_00 = 
MSH_START + "TRXTOOL|PCARESUP|PNP|PP|${{ timestamp }}||ZPN|3362|P|2.1||" + SEGMENT_END +
"ZZZ|TID||3362|P1|6H2O2||" + SEGMENT_END +
"ZCA||03|00|KC|13ZCB|BC00007007|200916|3362|" + SEGMENT_END + 
"ZCC||||||||||0009433498542|" + SEGMENT_END + SEGMENT_END;


function encode(hl7Message) {
    return b64encode(hl7Message, 'std');
}

export function Hl7v2RequestEncoded(template)
{
    var res = template.replace("${{ timestamp }}", timestamp());
    return encode(res);
}

function timestamp()
{
    var now = new Date(Date.now());
    var mon = now.getMonth() + 1;
    mon = (mon < 10) ? "0" + mon : mon;
    var day = now.getDate();
    day = (day < 10) ? "0" + day : day
    var str = now.getFullYear() + "/" +   // oddly the time stamp in HL7v2 does not use en-CA as in "2012-12-20"
        mon + "/" + day + " " +
        now.toLocaleTimeString("en-CA");
    return str;
}