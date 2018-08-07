declare module 'devtools-timeline-model' {
    export class ModelAPI {
        constructor(events: string);

        topDown(): { totalTime: number };
    }

    export default ModelAPI;
}