import addEventListener from 'add-dom-event-listener'
export { addEventListener }
/*
var handler = addEventListener(document.body, 'click', function(e){
  console.log(e.target); // works for ie
  
  console.log(e.nativeEvent); // native dom event
});
handler.remove(); // detach event listener
 */

const triggerEvent = (el, type) => {
    if (document.createEvent) {
        const event = document.createEvent('HTMLEvents')
        event.initEvent(type, false, true)
        el.dispatchEvent(event)
    }
}

export { triggerEvent }