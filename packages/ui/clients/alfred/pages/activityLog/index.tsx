import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import type { Event } from "@creativearis/models";

type FrontEndEvent = Event & { _id: string };

Pusher.logToConsole = false;

const pusher = new Pusher("d7880526d3965e004014", {
    cluster: "eu"
});

function getEvents() {
    return axios.get("/api/logs").then((res): Array<FrontEndEvent> => {
        console.log("res", res.data);
        return res.data;
    });
}
function getById(id: string) {
    return axios.get(`/api/logs/${id}`).then((res) => {
        console.log("res", res.data);
        return res.data;
    });
}

const ActivityLog = () => {
    const [events, setEvents] = useState<Array<FrontEndEvent>>([]);
    useEffect(() => {
        getEvents().then(setEvents);
    }, []);
    useEffect(() => {
        const channel = pusher.subscribe("my-channel");
        channel.bind("my-event", (data: any) => {
            console.log("data", data);
            const { logId } = data;
            getById(logId).then((item) => {
                setEvents(events.concat(item));
            });
            // alert(JSON.stringify(data));
        });

        return () => {
            pusher.unsubscribe("my-channel");
        };
    }, [events]);
    return (
        <div>
            <h2>Activity Log</h2>
            <Grid container>
                {events.map((item, index) => (
                    <Grid
                        container
                        justifyContent="space-between"
                        key={item._id}
                    >
                        <Grid item xs={1}>
                            {index}
                        </Grid>
                        <Grid item xs={1}>
                            {item.intField}
                        </Grid>
                        <Grid item xs={5}>
                            {item.stringField}
                        </Grid>
                        <Grid item xs={5}>
                            {item.tenantId}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

ActivityLog.propTypes = {};

export default ActivityLog;
