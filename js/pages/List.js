import { store } from "../main.js";
import { embed } from "../util.js";
import { score } from "../score.js";
import { fetchEditors, fetchList } from "../content.js";

import Spinner from "../components/Spinner.js";
import LevelAuthors from "../components/List/LevelAuthors.js";

const roleIconMap = {
    owner: "crown",
    admin: "user-gear",
    helper: "user-shield",
    dev: "code",
    trial: "user-lock",
};

export default {
    components: { Spinner, LevelAuthors },
    template: `
        <main v-if="loading">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-list">
            <div class="list-container">
                <table class="list" v-if="list">
                    <tr v-for="([level, err], i) in list">
                        <td class="rank">
                            <p v-if="i + 1 <= 200" class="type-label-lg">#{{ i + 1 }}</p>
                            <p v-else class="type-label-lg">Legacy</p>
                        </td>
                        <td class="level" :class="{ 'active': selected == i, 'error': !level }">
                            <button @click="selected = i">
                                <span class="type-label-lg">{{ level?.name || \`Error (\${err}.json)\` }}</span>
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="level-container">
                <div class="level" v-if="level">
                    <h1>{{ level.name }}</h1>
                    <LevelAuthors :author="level.author" :creators="level.creators" :verifier="level.verifier"></LevelAuthors>
                    <iframe class="video" id="videoframe" :src="video" frameborder="0"></iframe>
                    <ul class="stats">
                        <li>
                            <div class="type-title-sm">Points when completed</div>
                            <p>{{ score(selected + 1, 100, level.percentToQualify) }}</p>
                        </li>
                        <li>
                            <div class="type-title-sm">ID</div>
                            <p>{{ level.id }}</p>
                        </li>
                        <li>
                            <div class="type-title-sm">Fps</div>
                            <p>{{ level.fps || '60' }}</p>
                        </li>
                    </ul>
                    <h2>Records</h2>
                    <p v-if="selected + 1 <= 75"><strong>{{ level.percentToQualify }}%</strong> or better to qualify</p>
                    <p v-else-if="selected +1 <= 150"><strong>100%</strong> or better to qualify</p>
                    <p v-else>This level does not accept new records.</p>
                    <table class="records">
                        <tr v-for="record in level.records" class="record">
                            <td class="percent">
                                <p>{{ record.percent }}%</p>
                            </td>
                            <td class="user">
                                <a :href="record.link" target="_blank" class="type-label-lg">{{ record.user }}</a>
                            </td>
                            <td class="mobile">
                                <img v-if="record.mobile" :src="\`/assets/phone-landscape\${store.dark ? '-dark' : ''}.svg\`" alt="Mobile">
                            </td>
                            <td class="hz">
                                <p>{{ record.hz }}Hz</p>
                            </td>
                        </tr>
                    </table>
                </div>
                <div v-else class="level" style="height: 100%; justify-content: center; align-items: center;">
                    <p>(ノಠ益ಠ)ノ彡┻━┻</p>
                </div>
            </div>
            <div class="meta-container">
                <div class="meta">
                    <div class="errors" v-show="errors.length > 0">
                        <p class="error" v-for="error of errors">{{ error }}</p>
                    </div>
                    <div class="og">
                        <p class="type-label-md">Website layout made by <a href="https://tsl.pages.dev/" target="_blank">TheShittyList</a></p>
                    </div>
                    <template v-if="editors">
                        <h3>List Editors</h3>
                        <ol class="editors">
                            <li v-for="editor in editors">
                                <img :src="\`/assets/\${roleIconMap[editor.role]}\${store.dark ? '-dark' : ''}.svg\`" :alt="editor.role">
                                <a v-if="editor.link" class="type-label-lg link" target="_blank" :href="editor.link">{{ editor.name }}</a>
                                <p v-else>{{ editor.name }}</p>
                            </li>
                        </ol>
                    </template>
                    <h3>Description</h3>
                    <p>
                        This is the Lip Spam Challenge List (LSCL) for the game Geometry Dash. This list ranks the top 200 hardest lip spam challenges in the game, focusing on levels by enabling extremely high clicks-per-second (CPS) to pass intense, high-speed, or bug-heavy segments where traditional clicking fails. It specifically helps in navigating spam-heavy wave or orb sections, particularly in impossible or challenging custom levels where consistent, fast inputs are required over a short, frantic period.
                    </p>
                    <p>
                        Lip spamming is an extremely niche and largely humorous term in gaming culture that refers to the act of rapidly triggering inputs—such as keyboard/mouse clicks or touchscreen taps—using one’s lips instead of fingers. The term combines “lip,” indicating the unconventional method of input, and “spam,” a common gaming term meaning to perform an action repeatedly at high speed. While it is not a widely recognized or officially documented technique, it has appeared in small communities and discussions as a curious or exaggerated idea centered around achieving very high input speed, often measured in clicks per second (CPS) or taps per second (TPS).
                    </p>
                    <p>
                        In practice, lip spamming involves positioning the face close to a mouse or mobile device and using the lower lip to repeatedly press or vibrate against the input surface. This motion is intended to simulate or exceed the speed of traditional clicking methods such as jitter clicking, butterfly clicking, or drag clicking. On mobile devices, the same concept applies by tapping the screen with the lip instead of fingers. While the idea is theoretically capable of producing rapid inputs, the physical mechanics make it highly inconsistent and difficult to control, especially compared to standard hand-based techniques.
                    </p>
                    <p>
                        The primary goal behind lip spamming, at least conceptually, is to maximize input speed in games where rapid clicking can provide an advantage. In certain contexts, such as PvP scenarios in Minecraft, higher CPS can influence combat mechanics like hit registration or knockback. However, even in these cases, lip spamming is not considered a viable or competitive method due to its lack of precision and reliability. Established techniques using fingers are far more effective and widely practiced among skilled players.
                    </p>
                    <p>
                        Overall, lip spamming is best understood as a meme-like or experimental concept within gaming culture rather than a legitimate technique. It highlights the extremes of input-based gameplay and reflects the creativity and humor often found in gaming communities. While it shares conceptual similarities with real high-speed clicking methods, its impracticality, lack of control, and rarity in actual gameplay firmly place it in the realm of jokes, challenges, and curiosity rather than serious competitive use.
                    </p>
                    <h3>Submission Requirements</h3>
                    <p>
                        Achieved the record without using hacks (however, FPS bypass is allowed, up from 60fps to 480fps)
                    </p>
                    <p>
                        Achieved the record on the level that is listed on the site - please check the level ID before you submit a record
                    </p>
                    <p>
                        Has to have source audio in the video. Edited audio only does not count
                    </p>
                    <p>
                        The recording has to end minimum a bit after the last input
                    </p>
                    <p>
                        Do not use secret routes or bug routes
                    </p>
                    <p>
                        Do not use easy modes, only a record of the unmodified level qualifies
                    </p>
                    <p>
                        A challenge must have to be up to around 9 to 29 seconds (either you want only tiny or short length for your own level)
                    </p>
                    <p>
                        UFO-based challenges are unacceptable here, except for classic ones like: tree sam little buff, Hellcat tutorial li, Hellcat tutorial, sam family, clawbuckle never cle, sam x4, sam x3, tree sam & cherimoya ufo
                    </p>
                    <p>
                        Click Between Frames (CBF) & Click Between Steps (CBS) / Click On Steps (COS) are allowed, as long as if you show us proof that you did either of them on uncut recorded level verifications and vaildated completions
                    </p>
                    <p>
                        Once a level falls onto the Legacy List, we accept records for it but you wont get any list points
                    </p>
                    <h3>Important Notes</h3>
                    <p>
                        LSCL (or Lip Spam Challenge List) is a fan-made project and is not affiliated with, endorsed by, or associated with RobTopGames AB® in any way. This project operates independently, similar to other community-run lists such as TSL (The Shitty List) and TLL (The Layout List).
                    </p>
                    <p>
                        If you want to get Click Between Frames (CBF) in Geometry Dash to play our challenges that have the FPS count as that, you must install the Geode mod loader. Once Geode is installed, open the mods menu in the game, search for "Click Between Frames" by syzzi, and install it. This mod allows inputs between physics ticks to reduce input lag.
                    </p>
                </div>
            </div>
        </main>
    `,
    data: () => ({
        list: [],
        editors: [],
        loading: true,
        selected: 0,
        errors: [],
        roleIconMap,
        store
    }),
    computed: {
        level() {
            return this.list[this.selected][0];
        },
        video() {
            if (!this.level.showcase) {
                return embed(this.level.verification);
            }

            return embed(
                this.toggledShowcase
                    ? this.level.showcase
                    : this.level.verification
            );
        },
    },
    async mounted() {
        // Hide loading spinner
        this.list = await fetchList();
        this.editors = await fetchEditors();

        // Error handling
        if (!this.list) {
            this.errors = [
                "Failed to load list. Retry in a few minutes or notify list staff.",
            ];
        } else {
            this.errors.push(
                ...this.list
                    .filter(([_, err]) => err)
                    .map(([_, err]) => {
                        return `Failed to load level. (${err}.json)`;
                    })
            );
            if (!this.editors) {
                this.errors.push("Failed to load list editors.");
            }
        }

        this.loading = false;
    },
    methods: {
        embed,
        score,
    },
};
