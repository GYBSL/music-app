<template>
  <div class="bgbox1">
    <div class="combox">
      <div class="cmt-head">
        <a href="javaScript: ;">
          <img
            :src="
              comments
                ? comments.user.avatarUrl
                : hotcomment
                ? hotcomment.user.avatarUrl +
                  `?imageView=1&type=webp&thumbnail=247x0`
                : ''
            "
            alt=""
          />
        </a>
      </div>
      <div class="cmt-wrap">
        <div class="cmt-name">
          <div class="dleft">
            <span class="cname">
              <a href="javaScript: ;">
                {{
                  comments
                    ? comments.user.nickname
                    : hotcomment
                    ? hotcomment.user.nickname
                    : ""
                }}
              </a>
            </span>
            <p>
              {{
                comments
                  ? comments.timeStr
                  : hotcomment
                  ? hotcomment.timeStr
                  : "" | timerule
              }}
            </p>
          </div>
          <div class="dright">
            <span class="cmt-span1">
              <span class="cmt-count">{{
                comments
                  ? comments.likedCount
                  : hotcomment
                  ? hotcomment.likedCount
                  : ""
              }}</span>
              <i>
                <svg
                  class="u-svg u-svg-unzancmt"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 28"
                >
                  <path
                    fill="#999"
                    d="m25.857 14.752c-.015.059-1.506 5.867-2.932 8.813-1.162 2.402-3 2.436-3.099 2.436h-12.826v-13c3 0 5.728-4 5.728-7.275 0-3.725 1.433-3.725 2.142-3.725 1.327 0 1.978 1.345 1.978 4 0 2.872-.832 4.525-.839 4.537-.161.31-.155.682.027.981.181.299.5.482.849.482h6.942c.922 0 1.551.215 1.866.64.467.626.286 1.705.164 2.112m-23.857 10.248v-10c0-1.795.659-1.981.855-2h2.145v13h-2.173c-.829 0-.827-.648-.827-1m25.309-13.54c-.713-.969-1.886-1.46-3.482-1.46h-5.519c.26-.932.519-2.285.519-4 0-5.221-2.507-6-4-6-1.909 0-4.185.993-4.185 5.725 0 2.206-1.923 5.275-3.815 5.275h-4-.011c-1.034.011-2.816.862-2.816 4v10.02c0 1.198.675 2.979 2.827 2.979h16.971.035c.364 0 3.224-.113 4.894-3.564 1.514-3.127 3.01-8.942 3.056-9.14.071-.23.664-2.289-.474-3.836"
                  ></path>
                </svg>
              </i>
            </span>
          </div>
        </div>
        <div class="cmt-content">
          <span class="cmt-text">{{
            comments ? comments.content : hotcomment ? hotcomment.content : ""
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playlistId: [Number, null],
    hotcomment: [Object, null],
    comments: [Object, null],
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.bgbox1 {
  width: 100%;
  .combox {
    padding-top: 10px;
    width: 100%;
    display: flex;
    .cmt-head {
      width: 50px;
      height: 35px;
      display: flex;
      justify-content: center;
      flex: none;
      a {
        position: relative;
        display: block;
        color: #507daf;
        text-decoration: none;
        img {
          border-radius: 50%;
          width: 30px;
          height: 30px;
        }
      }
    }
    .cmt-wrap {
      width: 85%;
      padding-left: 0;
      padding-right: 10px;
      padding-bottom: 11px;
      flex: 1 1 auto;
      .cmt-name {
        display: flex;
        width: 100%;
        justify-content: space-between;
        .dleft {
          width: 80%;
          flex: 1 1 auto;
          .cname {
            max-width: 100%;
            display: inline-flex;
            align-items: center;
            a {
              max-width: 100%;
              font-size: 14px;
              color: #666;
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              text-decoration: none;
            }
          }
          p {
            font-size: 9px;
            color: #999;
          }
        }
        .dright {
          width: 65px;
          height: 22px;
          line-height: 22px;
          font-size: 11px;
          color: #999;
          flex: none;
          text-align: right;
          .cmt-span1 {
            display: inline-block;
            min-width: 30px;
            padding-left: 5px;
            .cmt-count {
              vertical-align: middle;
            }
            i {
              display: inline-block;
              width: 14px;
              height: 14px;
              margin-left: 6px;
              line-height: 0;
              vertical-align: middle;
              cursor: pointer;
              margin-top: -5px;
              svg {
                display: inline-block;
                vertical-align: middle;
                background-position: 0 0;
                background-size: contain;
                background-repeat: no-repeat;
              }
            }
          }
        }
      }
    }
    .cmt-content {
      position: relative;
      color: #333;
      font-size: 15px;
      line-height: 22px;
      margin-top: 5px;
    //   overflow: hidden;
      span {
        vertical-align: middle;
      }
      &::after {
        position: absolute;
        z-index: 2;
        content: "";
        bottom: -10px;
        left: 0;
        pointer-events: none;
        box-sizing: border-box;
        transform-origin: top left;
        border: 0px solid rgba(0,0,0,.1);
        border-bottom-width: 1px;
        width: 200%;
        transform: scale(.5);
      }
    }
  }
}
</style>