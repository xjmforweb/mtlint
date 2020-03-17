<template>
    <div class="com-search-box">
        <el-form :inline="true" :model="params" class="demo-form-inline">
            <el-form-item>
                <el-select v-model="params.search_without_staff" @change="onChange">
                    <el-option value="self" label="个人历史"></el-option>
                    <el-option value="selfStore" label="门店历史"></el-option>
                    <el-option value="otherStore" label="转门店历史"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input
                        placeholder=""
                        v-model="value"
                        style="width: 400px;"
                        @keydown.enter.native="search"
                        clearable
                >
                    <el-select
                            v-model="type"
                            slot="prepend"
                            placeholder="请选择"
                            style="width: 100px;"
                    >
                        <el-option label="订单号" value="order_num"></el-option>
                        <el-option label="手机号" value="user_phone"></el-option>
                        <el-option label="姓名" value="user_name"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import * as util from 'utils/util'

    export default {
        data () {
            return {
                params: {
                    search_without_staff: 'self'
                },
                value: '',
                type: 'order_num'
            }
        },
        methods: {
            
            onChange () {
                this.value = ''
                let res = {
                    ...this.params
                }
                this.$emit('search', util.clearBlankItem(res))
            },
            search () {
                if (!this.value) { return this.$message.warning('请输入查询内容！') }
                let res = {
                    ...this.params
                }
                a = {}
                res[this.type] = this.value.trim()
                this.$emit('search', util.clearBlankItem(res))
            },

        }
    }
</script>

<style>


    .b{
        display: flex;

    }

</style>


