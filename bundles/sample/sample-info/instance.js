const BasicBundle = Oskari.clazz.get('Oskari.BasicBundle');
/**
 * @class Oskari.sample.info.SampleInfoBundleInstance
 */
Oskari.clazz.defineES('Oskari.sample.info.SampleInfoBundleInstance', class SampleInfoBundleInstance extends BasicBundle {
    constructor () {
        super();
        this.__name = 'SampleInfoBundleInstance';
        this.loc = Oskari.getMsg.bind(null, 'sample-info');
    }
    _startImpl (sandbox) {
        this._registerForGuidedTour();
    }
    /**
     * @method _registerForGuidedTour
     * Registers bundle for guided tour help functionality. Waits for guided tour load if not found
     */
    _registerForGuidedTour () {
        const sendRegister = () => {
            const requestBuilder = Oskari.requestBuilder('Guidedtour.AddToGuidedTourRequest');
            if (requestBuilder && this.sandbox.hasHandler('Guidedtour.AddToGuidedTourRequest')) {
                const delegate = {
                    bundleName: this.getName(),
                    priority: 1000,
                    getTitle: () => this.loc('guidedTour.title'),
                    getContent: () => this.loc('guidedTour.message'),
                    getPositionRef: () => jQuery('#pltools > mdb-navbar > nav > nav > div > ul > li > a'),
                    positionAlign: 'left'
                };
                this.sandbox.request(this, requestBuilder(delegate));
            }
        };

        const tourInstance = this.sandbox.findRegisteredModuleInstance('GuidedTour');
        if (tourInstance) {
            sendRegister();
        } else {
            Oskari.on('bundle.start', (msg) => {
                if (msg.id === 'guidedtour') {
                    sendRegister();
                }
            });
        }
    }
}, {
    'protocol': ['Oskari.bundle.BundleInstance', 'Oskari.mapframework.module.Module']
});
