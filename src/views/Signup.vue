<template>
    <v-container>
        <!-- 表示名変更 -->
        <user-update-dialog
            ref="user_update_dialog"
        ></user-update-dialog>
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
            <v-card-title>ユーザー登録</v-card-title>
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
                    @click="signUp"
                >
                    サインアップ
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import UserUpdateDialog from '../components/Signup/UserUpdateDialog.vue';



@Component({
    components: {
        'user-update-dialog': UserUpdateDialog,
    }
})
export default class Signup extends Vue {
    $refs!: {
        'user_update_dialog': UserUpdateDialog
    }
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

    /**
     * サインアップ
     */
    public signUp() {
        this.is_loading = true;        
        this.$auth.createUserWithEmailAndPassword(this.email, this.password)
            .then((user: firebase.auth.UserCredential) => {
                this.message = 'ユーザーを登録しました。';
                this.snackbar_color = 'success';

                this.snackbar = true;

                // ダイアログのオープン
                this.$refs.user_update_dialog.open();
            }).catch((error: any) => {
                console.log(error);
                this.message = 'ユーザー登録に失敗しました。';
                this.snackbar_color = 'error';

                this.snackbar = true;

            }).finally(() => {
                this.is_loading = false;
            });
    }
}
</script>