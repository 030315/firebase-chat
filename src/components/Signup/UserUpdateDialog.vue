<template>
    <v-dialog
        persistent
        max-width="500px"
        v-model="dialog"
    >
        <v-card
            class="mx-auto"
        >
            <v-card-title>表示名登録</v-card-title>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col>
                            <v-text-field
                                label="表示名"
                                v-model="displayName"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    depressed
                    color="primary"
                    @click="update"
                >
                    登録
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class UserUpdateDialog extends Vue {
    public dialog: boolean = false;
    public displayName: string = '';

    /**
     * ユーザー情報のアップデート
     */
    public update() {
        const user: firebase.User | null = this.$auth.currentUser;
        if (user == null) {
            alert('この画面が見れるのはおかしいよ。');
            return;
        }
        user.updateProfile({
            displayName: this.displayName,
        }).then(() => {
            this.$router.push({name: 'Chat'});
        }).catch((error) => {
            console.error(error);
        });
    }

    /**
     * ダイアログのオープン
     */
    public open() {
        this.dialog = true;
    }
}
</script>