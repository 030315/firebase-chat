<template>
    <v-container>
        <!-- スナックバー -->
        <v-snackbar
            v-model="snackbar"
            top
            :color="snackbar_color"
        >
            {{ message }}
            <v-btn @click="snackbar = false" text>閉じる</v-btn>
        </v-snackbar>
        <v-card 
            class="mx-auto"
            max-width="500"
        >
            <v-card-title>ログイン</v-card-title>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="email"
                                label="メールアドレス"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="password"
                                label="パスワード"
                                :type="show ? 'text' : 'password'"
                                :append-icon="show ? 'visibility' : 'visibility_off'"
                                @click:append="show = !show"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    class="float-right"
                    depressed
                    color="primary"
                    @click="login"
                >
                    ログイン
                </v-btn>
                <v-btn
                    depressed
                    color="success"
                    @click="goSignUp"
                >
                    サインアップ
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class Login extends Vue {
    /**
     * メールアドレス
     */
    public email: string = '';
    /**
     * パスワード
     */
    public password: string = '';

    public show: boolean = false;

    public snackbar: boolean = false;

    public snackbar_color: string = 'success';

    public message: string = '';

    public is_loading: boolean = false;

    public login() {
        this.is_loading = true;
        this.$auth.signInWithEmailAndPassword(this.email, this.password)
            .then((user: any) => {
                this.message = 'ユーザーを登録しました。';
                this.snackbar_color = 'success';

                this.snackbar = true;

                // チャット画面に移動
                this.$router.push({name: 'Chat'});
            }).catch((error: any) => {
                this.message = 'ユーザー登録に失敗しました。';
                this.snackbar_color = 'error';

                this.snackbar = true;

            }).finally(() => {
                this.is_loading = false;
            });
    }

    public goSignUp() {
        this.$router.push({name: 'Signup'});
    }
}
</script>