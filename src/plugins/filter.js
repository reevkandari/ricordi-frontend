import { date } from 'quasar';

export default ({ Vue }) => {
    Vue.filter('text2html',text2html);
    Vue.filter('avatarImage',avatarImage);
    Vue.filter('dateClean',dateClean);
    Vue.filter('firstName',firstName);    
}
function firstName(value){
    
    return value.split(/\s(.+)/)[0];
    //return name.charAt(0).toUpperCase() + name.slice(1);
}

function dateClean(value){
    let diff = date.getDateDiff( new Date(Date.now()), new Date(value),  'days');
    if(diff < 1 ) return 'Today';
    else if(diff < 2 ) return 'Yesterday';
    else if(diff < 8 ) return 'A few days back';
    else if(diff < 10 ) return 'Last week';
    else if(diff < 25) return 'A few weeks back';
    else return 'On ' + date.formatDate(value, 'Do MMMM YYYY');
    //return diff; //date.formatDate(value, 'Do MMMM YYYY');
}
function text2html(value){
    if(value) return value.replace(/\n/g, "<br />");
    else return 'Nall';
}

function avatarImage(value){
    if(typeof value === 'object') return value;
    if (value && value){
        if(value.includes(':')) return value;
        else return "https://ricordi.zivi.in/media/"+value;
    }else return '../assets/emptyProfile.jpg'
}
