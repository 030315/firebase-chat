<template>
    <v-container>
        <!-- 送信成功 -->
        <v-snackbar
            v-model="snackbar"
            color="success"
            top
        >
            発言に成功しました！
            <v-btn
                text
                @click="snackbar = false"
            >
                閉じる
            </v-btn>
        </v-snackbar>
        <v-card 
            class="mx-auto"
            max-width="800"
        >
            <v-card-text>
                <v-alert type="success">
                    「{{ getDisplayName }}」さんこんにちは！
                </v-alert>
                <v-row>
                    <v-col>
                        <v-textarea
                            label="発言"
                            auto-grow
                            outlined
                            row="3"
                            v-model="message"
                        ></v-textarea>
                        <v-btn
                            color="primary"
                            @click="sendMessage"
                        >
                            発言する！
                        </v-btn>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </v-card-text>
            <v-row>
                <v-col>
                    <v-card v-for="(chat, key) in chats" :key="'chat' + key">
                        <v-card-title>
                            <v-chip outlined>
                                <v-icon left color="red">mdi-account</v-icon>
                                {{ chat.name }}
                            </v-chip>
                        </v-card-title>
                        <v-card-text v-html="convertMessage(chat.message)"></v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

import firebase from 'firebase';

interface ChatMessage {
    name: string,
    message: string,
};

@Component
export default class Chat extends Vue {
    public user: firebase.User | null = null;

    public snackbar: boolean = false;

    public message: string = '';

    public chats: ChatMessage[] = [];

    mounted() {
        this.user = this.$auth.currentUser;
        if (this.user == null) {
            this.$router.push({name: 'Login'});
            return;
        }

        this.fetchMessages();
    }

    /**
     * 表示名の取得
     */
    public get getDisplayName(): string | null {
        if (this.user == null) {
            return '';
        }

        return this.user.displayName;
    }

    /**
     * 改行コードを<br>に変換する
     */
    public convertMessage(message: string): string {
        return message.replace(/\r?\n/g, '<br>');
    }

    /**
     * メッセージ送信
     */
    public sendMessage() {
        let database: firebase.database.Database = firebase.database();
        let chat: firebase.database.Reference = database.ref();

        if (this.user == null) {
            alert('ログインしてください。');
            this.$router.push({name: 'Login'});
            return;
        }
        // 送信
        chat.push({
            name: this.user.displayName,
            message: this.message
        }).then((response) => {
            this.message = '';
            this.snackbar = true;
        }).catch((error) => {
            console.error(error);
        });
    }

    /**
     * メッセージの取得
     */
    public fetchMessages() {
        let database: firebase.database.Database = firebase.database();
        let chat: firebase.database.Reference = database.ref();
        // イベントの設定
        chat.on('child_added', this.childAdded);
        // チャットメッセージの取得
        chat.once('value').then((snapshot) => {
            snapshot.forEach((data) => {
                console.log(data.val());
                this.chats.push(data.val());
            });
            this.chats = this.chats.reverse();
        });
    }

    /**
     * チャットメッセージの追加
     */
    private childAdded(snap: firebase.database.DataSnapshot | null) {
        if (snap == null) {
            alert('メッセージの取得に失敗しました。');
            return;
        }
        const chat = snap.val();

        console.log(chat);

        this.chats.unshift({
            message: chat.message,
            name: chat.name,
        });
    }
}
</script>