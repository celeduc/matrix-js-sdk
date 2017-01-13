"use strict";
let sdk = require("../..");
let User = sdk.User;
let utils = require("../test-utils");

describe("User", function() {
    let userId = "@alice:bar";
    let user;

    beforeEach(function() {
        utils.beforeEach(this); // eslint-disable-line no-invalid-this
        user = new User(userId);
    });

    describe("setPresenceEvent", function() {
        let event = utils.mkEvent({
            type: "m.presence", content: {
                presence: "online",
                user_id: userId,
                displayname: "Alice",
                last_active_ago: 1085,
                avatar_url: "mxc://foo/bar",
            }, event: true,
        });

        it("should emit 'User.displayName' if the display name changes", function() {
            let emitCount = 0;
            user.on("User.displayName", function(ev, usr) {
                emitCount += 1;
            });
            user.setPresenceEvent(event);
            expect(emitCount).toEqual(1);
            user.setPresenceEvent(event); // no-op
            expect(emitCount).toEqual(1);
        });

        it("should emit 'User.avatarUrl' if the avatar URL changes", function() {
            let emitCount = 0;
            user.on("User.avatarUrl", function(ev, usr) {
                emitCount += 1;
            });
            user.setPresenceEvent(event);
            expect(emitCount).toEqual(1);
            user.setPresenceEvent(event); // no-op
            expect(emitCount).toEqual(1);
        });

        it("should emit 'User.presence' if the presence changes", function() {
            let emitCount = 0;
            user.on("User.presence", function(ev, usr) {
                emitCount += 1;
            });
            user.setPresenceEvent(event);
            expect(emitCount).toEqual(1);
            user.setPresenceEvent(event); // no-op
            expect(emitCount).toEqual(1);
        });

        it("should set User.displayName", function() {
            user.setPresenceEvent(event);
            expect(user.displayName).toEqual("Alice");
        });

        it("should set User.avatarUrl", function() {
            user.setPresenceEvent(event);
            expect(user.avatarUrl).toEqual("mxc://foo/bar");
        });

        it("should set User.presence", function() {
            user.setPresenceEvent(event);
            expect(user.presence).toEqual("online");
        });

        it("should set User.lastActiveAgo", function() {
            user.setPresenceEvent(event);
            expect(user.lastActiveAgo).toEqual(1085);
        });

        it("should set User.events.presence", function() {
            user.setPresenceEvent(event);
            expect(user.events.presence).toEqual(event);
        });
    });
});