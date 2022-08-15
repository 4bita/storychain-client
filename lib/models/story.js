export class Story {
    id;
    key;
    version;
    title;
    content;
    image;
    attributes;
    appId;
    contentType;
    category;
    tags;

    constructor(data, key=null) {
        this.key = key;
        // This is a hack, contract doesn't provide an id
        this.id = Date.now();

        // IPFS content
        this.version = "1.0.0";
        this.title = data.title;
        this.content = data.content;
        this.image = data.image;
        this.attributes = data.image || [];
        this.appId = "Lenster";
        this.contentType = data.contentType || 'text';
        this.category = data.category || 'default';
        this.tags = data.tags || [];
    }
}
